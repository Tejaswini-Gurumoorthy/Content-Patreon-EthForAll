const hre = require("hardhat");
const fetch = require('node-fetch')
const axios= require('axios');
const Web3Storage= require('web3.storage').Web3Storage;
const addr= "0x5FbDB2315678afecb367f032d93F642f64180aa3";
const contractName= "Blog";

async function main() {
 const blogContract= require("../artifacts/contracts/Blog.sol/Blog.json");
 const storage= new Web3Storage({token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweDBBMjBDZGMwOWI5NjUwRDA3MWE3RWRjMjkwMjlkMDY5NDA2NENlNTQiLCJpc3MiOiJ3ZWIzLXN0b3JhZ2UiLCJpYXQiOjE2NzYxMTM3OTc5NjcsIm5hbWUiOiJCTE9HIn0.YKrOQR6Xvc_Z6rMB0brS5xmfkmptBrHyBGLwPJ2syFA'});

 const contract = await hre.ethers.getContractAt(contractName,addr);
 const [owner, addr1, addr2, addr3, addr4, addr5, addr6, addr7]= await hre.ethers.getSigners();
 await contract.deployed();

// const tx1= await contract.connect(addr1).joinCreator('TG');
// const receipt1= await tx1.wait();
// console.log(receipt1);

// const ans1= await contract.connect(addr1).creatorInfo();
// console.log(ans1.name);

// const cid= "bafybeigwdveorf5kf5zsrbhptoppcwztavehraffzhf372dkkux7sqozxy";
// const tx2= await contract.connect(addr1).postBlog(cid);
// const receipt2= await tx2.wait();
// console.log(receipt2);

// const ans2= await contract.connect(addr1).getAllBlogs(0);
// const url= `https://${ans2._cid}.ipfs.dweb.link/plain-utf8.txt`;
// const res= await storage.get(ans2._cid)
// const result= await axios.get(url);
// console.log(result.data);

// const tx3= await contract.connect(addr4).joinConsumer('Mom');
// const receipt3= await tx3.wait();
// console.log(receipt3);

// const ans3= await contract.connect(addr4).consumerInfo();
// console.log(ans3);

// const ans1= await contract.connect(addr4).totalCreatorFollowing();
// console.log('Before'+ ans1);

// const tx= await contract.connect(addr4).followCreator(addr1.address);
// const receipt= await tx.wait();
// console.log(receipt);

// const ans1= await contract.connect(addr4).totalCreatorFollowing();
// const ans2= await contract.connect(addr1).totalConsumerFollowing();
// console.log(ans1+' & '+ans2);

const ans1= await contract.connect(addr4).getCreatorFollowingDetails(0);
const ans2= await contract.connect(addr1).getConsumerFollowingDetails(0);
console.log(ans1+' & '+ans2);

// const tx= await contract.connect(addr4).likeBlog("bafybeiaj3tsws7r7hg36hh2quyx3a2gvh77qublwzya6h5223myrwee5rq", {value: ethers.utils.parseEther("0.5")});
// const receipt= await tx.wait();
// console.log(receipt);

// const ans= await contract.connect(addr4).totalCreatorFollowing();
// console.log(ans);




}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });

//pvt key sample 0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80
//public key 0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266