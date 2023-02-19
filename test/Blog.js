const {expect}= require("chai")
const { ethers } = require("hardhat")
const hre = require("hardhat");
const {loadFixture}= require("@nomicfoundation/hardhat-network-helpers");
const addr= "0x5FbDB2315678afecb367f032d93F642f64180aa3";
const contractName= "Blog";


describe("Must deploy the contract",function(){
    async function deployFixture()
    {
        const [owner, addr1, addr2, addr3, addr4, addr5, addr6, addr7]=await ethers.getSigners();
        const contract = await hre.ethers.getContractAt(contractName,addr);
        return {owner, contract, addr1, addr2, addr3, addr4, addr5, addr6, addr7};
    }
    
    it("Should give owner address", async function(){
     const {contract, owner}= await loadFixture(deployFixture);
     expect(await contract.owner.call()).to.equal(owner.address);
    })

    it("must match all the levels", async function(){
        const {contract}= await loadFixture(deployFixture);
        expect(await contract.level1.call()).to.equal(2);
        expect(await contract.level2.call()).to.equal(4);
        expect(await contract.level3.call()).to.equal(8);

    })

    it("Creator must join", async function(){
        
    })
})