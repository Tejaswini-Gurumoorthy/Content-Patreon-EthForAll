// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

contract Blog{
    address public owner;
    uint public level1;
    uint public level2;
    uint public level3;

    struct ValueLevel{
        uint value;
        uint level;
        bool follows;
    }

    struct Cid{
        uint timestamp;
        uint amtEarned;
    }

    struct Creator{
        string name;
        uint total; //total amount earned
        mapping(address=>ValueLevel) consumerAmt; //mapping to store the follower consumer's total contribution to the creator
        mapping(string=> Cid) blogInfo; //mapping to store blog's cid mapped to timestamp and amount earned.
        string[] cids;
        address[] allConsumers;
        bool exists;

    }

    struct Consumer{
        string name;
        mapping(address=>ValueLevel) creatorAmt; //mapping which stores the communities consumer is a part of and their contributions.
        address[] allCreators;
        bool exists;
    }
    
    mapping(address=>Creator) private creators;
    mapping(address=>Consumer) private consumers;
    mapping(string=>address) public cidBlog; //it maps a cid to an owner;
    event BlogPost(address, string);
    event SilverNFT(address, address); //creator consumer
    event GoldNFT(address, address);
    event PlatinumNFT(address, address);
    event CreatorJoined(address); 
    event testingFollows(address, bool);

    constructor(uint _level1, uint _level2, uint _level3)
    {
        owner= msg.sender;
        level1= _level1;
        level2= _level2;
        level3= _level3;
    }

    //creator
    function joinCreator(string memory _name) public{
        require(consumers[msg.sender].exists==false, "Consumer cannot be Creator");
        require(creators[msg.sender].exists==false, "Creator already exists");

        Creator storage newCreator= creators[msg.sender];
        newCreator.name= _name;
        newCreator.total=0;
        newCreator.exists= true;
        emit CreatorJoined(msg.sender);

    }

    //consumer
    function joinConsumer(string memory _name) public 
    {
        require(creators[msg.sender].exists==false, "Creator cannot be consumer");
        require(consumers[msg.sender].exists==false, "Consumer already exists");
        Consumer storage newConsumer= consumers[msg.sender];
        newConsumer.name= _name;
        newConsumer.exists= true;
    }

    // creator
    function postBlog(string memory _cid) public
    {
        require(creators[msg.sender].exists==true, "User not registered");
        creators[msg.sender].cids.push(_cid);
        creators[msg.sender].blogInfo[_cid].timestamp= block.timestamp;
        creators[msg.sender].blogInfo[_cid].amtEarned = 0;
        emit BlogPost(msg.sender, _cid);
    }

    //consumer
    function followCreator(address _creatorAddress) public{
        require(consumers[msg.sender].exists==true, "User not registered");
        require(consumers[msg.sender].creatorAmt[_creatorAddress].follows== false, "User already follows");
        require(creators[_creatorAddress].consumerAmt[msg.sender].follows== false, "User already follows");
        consumers[msg.sender].creatorAmt[_creatorAddress].follows= true;
        creators[_creatorAddress].consumerAmt[msg.sender].follows= true;
        consumers[msg.sender].allCreators.push(_creatorAddress);
        creators[_creatorAddress].allConsumers.push(msg.sender);
    }

    //consumer
    function likeBlog(string memory _cid) public payable
    {
        address _creatorAddress= cidBlog[_cid];
        require(consumers[msg.sender].creatorAmt[_creatorAddress].follows== true, "Follow the creator first");
        require(creators[_creatorAddress].consumerAmt[msg.sender].follows==true, "Follow the creator first");
        (bool s,)= cidBlog[_cid].call{ value: msg.value }("");
        require(s);
        creators[_creatorAddress].consumerAmt[msg.sender].value+= msg.value;
        consumers[msg.sender].creatorAmt[_creatorAddress].value+= msg.value;
        creators[_creatorAddress].total+=msg.value;
    }

    //consumer
    function joinCommunity(address _creatorAddress, uint level) public
    {
        require(consumers[msg.sender].creatorAmt[_creatorAddress].follows== true, "Follow the creator first");
        if(level==1)
        {
        require(consumers[msg.sender].creatorAmt[_creatorAddress].value >= level1, "Not eligible");
        consumers[msg.sender].creatorAmt[_creatorAddress].level= 1;
        creators[_creatorAddress].consumerAmt[msg.sender].level=1;
        emit SilverNFT(_creatorAddress,msg.sender);
        }
        else if(level==2)
        {
            require(consumers[msg.sender].creatorAmt[_creatorAddress].level ==1, "Not eligible");
            require(consumers[msg.sender].creatorAmt[_creatorAddress].value >= level2, "Not eligible");
            consumers[msg.sender].creatorAmt[_creatorAddress].level= 2;
            creators[_creatorAddress].consumerAmt[msg.sender].level=2;
            emit GoldNFT(_creatorAddress,msg.sender);
        }
        else if(level==3)
        {
            require(consumers[msg.sender].creatorAmt[_creatorAddress].level ==2, "Not eligible");
            require(consumers[msg.sender].creatorAmt[_creatorAddress].value >= level3, "Not eligible");
            consumers[msg.sender].creatorAmt[_creatorAddress].level= 3;
            creators[_creatorAddress].consumerAmt[msg.sender].level=3;
            emit PlatinumNFT(_creatorAddress,msg.sender);
       }
       }

    //creator getters
    function creatorInfo() public view returns (string memory name, uint total, bool exists)
    {
        require(creators[msg.sender].exists==true || msg.sender== owner, "Creator doesn't exist");
        name= creators[msg.sender].name;
        total= creators[msg.sender].total;
        exists= creators[msg.sender].exists;
    }
    function totalNoOfBlogs() public view returns(uint)
    {
        require(creators[msg.sender].exists==true || msg.sender==owner, "Creator doesn't exist");
        return creators[msg.sender].cids.length;
    }

    function getAllBlogs(uint _idx) public view returns(string memory _cid, uint timestamp, uint amtEarned){
        require(creators[msg.sender].exists==true || msg.sender== owner, "Not accessible");
        _cid= creators[msg.sender].cids[_idx];
        timestamp= creators[msg.sender].blogInfo[_cid].timestamp;
        amtEarned= creators[msg.sender].blogInfo[_cid].amtEarned;
    }

   
    function totalConsumerFollowing() public view returns(uint)
    {
        require(creators[msg.sender].exists==true || msg.sender== owner, "Not accessible");
        return creators[msg.sender].allConsumers.length;
    }

    function getConsumerFollowingDetails(uint _idx) public view returns(uint value, uint level, bool follows, address consumer){
        require(creators[msg.sender].exists==true  || msg.sender== owner, "Not accessible");
        consumer= creators[msg.sender].allConsumers[_idx];
        value= creators[msg.sender].consumerAmt[consumer].value;
        level= creators[msg.sender].consumerAmt[consumer].level;
        follows= creators[msg.sender].consumerAmt[consumer].follows;
    }

     //consumer getters
    function consumerInfo() public view returns(string memory name, bool exists)
    {
        require(consumers[msg.sender].exists==true  || msg.sender== owner, "Not accessible");
        name = consumers[msg.sender].name;
        exists= consumers[msg.sender].exists;
    }

    function totalCreatorFollowing() public view returns(uint)
    {
        require(consumers[msg.sender].exists==true || msg.sender== owner, "Not accessible");
        return consumers[msg.sender].allCreators.length;
    }

    //called by consumer
    function getCreatorFollowingDetails(uint _idx) public view returns(uint value, uint level, bool follows, address creator) 
    {
        require(consumers[msg.sender].exists==true  || msg.sender== owner, "Not accessible");
        creator= consumers[msg.sender].allCreators[_idx];
        value= consumers[msg.sender].creatorAmt[creator].value;
        level= consumers[msg.sender].creatorAmt[creator].level;
        follows= consumers[msg.sender].creatorAmt[creator].follows;
    }
}