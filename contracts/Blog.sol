// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

contract Blog{
    mapping(uint=>address) public cidBlog; //it maps a cid to an owner;
    event BlogPost(address, uint);
    address public owner;
    uint public level1;
    uint public level2;
    uint public level3;

    struct ValueLevel{
        uint value;
        uint level;
        bool follows;
    }

    struct Creator{
        string name;
        mapping(uint=>uint) cidAmt; //mapping which stores the amount earned by each blog
        uint total; //total amount earned
        mapping(address=>ValueLevel) consumerAmt; //mapping to store the follower consumer's total contribution to the creator
        mapping(uint=>uint) cidToTimestamp; //mapping containing cid of all blogs by creator to the timestamp
        bool exists;

    }

    struct Consumer{
        string name;
        mapping(address=>ValueLevel) creatorAmt; //mapping which stores the communities consumer is a part of and their contributions.
        bool exists;
    }
    
    mapping(address=>Creator) creators;
    mapping(address=>Consumer) consumers;

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
        Creator storage newCreator= creators[msg.sender];
        newCreator.name= _name;
        newCreator.total=0;
        newCreator.exists= true;

    }

    //consumer
    function joinConsumer(string memory _name) public {
        require(creators[msg.sender].exists==false, "Creator cannot be consumer");
        Consumer storage newConsumer= consumers[msg.sender];
        newConsumer.name= _name;
        newConsumer.exists= true;
    }

    // creator
    function postBlog(uint _cid) public
    {
        require(creators[msg.sender].exists==true, "User not registered");
        creators[msg.sender].cidAmt[_cid]=0;
        creators[msg.sender].cidToTimestamp[_cid]= block.timestamp;
        emit BlogPost(msg.sender, _cid);
    }

    //consumer
    function FollowCreator(address _creatorAddress) public{
        require(consumers[msg.sender].exists==true, "User not registered");
        require(consumers[msg.sender].creatorAmt[_creatorAddress].follows== false, "User already follows");
        consumers[msg.sender].creatorAmt[_creatorAddress].value= 0;
        consumers[msg.sender].creatorAmt[_creatorAddress].level= 0;
        consumers[msg.sender].creatorAmt[_creatorAddress].follows= true;
        creators[_creatorAddress].consumerAmt[msg.sender].value=0;
        creators[_creatorAddress].consumerAmt[msg.sender].level=0;
        creators[_creatorAddress].consumerAmt[msg.sender].follows=true;
    }

    //consumer
    function LikeBlog(uint _cid) public payable
    {
        address _creatorAddress= cidBlog[_cid];
        require(consumers[msg.sender].creatorAmt[_creatorAddress].follows== true, "Follow the creator first");
        (bool s,)= cidBlog[_cid].call{ value: msg.value }("");
        require(s);
        creators[_creatorAddress].consumerAmt[msg.sender].value+= msg.value;
        consumers[msg.sender].creatorAmt[_creatorAddress].value+= msg.value;
        creators[_creatorAddress].total+=msg.value;
    }

    //consumer
    function JoinCommunity(address _creatorAddress, uint level) public
    {
        require(consumers[msg.sender].creatorAmt[_creatorAddress].follows== true, "Follow the creator first");
        if(level==1)
        {
        require(consumers[msg.sender].creatorAmt[_creatorAddress].value >= level1, "Not eligible");
        consumers[msg.sender].creatorAmt[_creatorAddress].level= 1;
        creators[_creatorAddress].consumerAmt[msg.sender].level=1;
        }
        else if(level==2)
        {
            require(consumers[msg.sender].creatorAmt[_creatorAddress].level ==1, "Not eligible");
            require(consumers[msg.sender].creatorAmt[_creatorAddress].value >= level2, "Not eligible");
            consumers[msg.sender].creatorAmt[_creatorAddress].level= 2;
            creators[_creatorAddress].consumerAmt[msg.sender].level=2;
        }
        else if(level==3)
        {
            require(consumers[msg.sender].creatorAmt[_creatorAddress].level ==2, "Not eligible");
            require(consumers[msg.sender].creatorAmt[_creatorAddress].value >= level3, "Not eligible");
            consumers[msg.sender].creatorAmt[_creatorAddress].level= 3;
            creators[_creatorAddress].consumerAmt[msg.sender].level=3;
        }


    }
    

}