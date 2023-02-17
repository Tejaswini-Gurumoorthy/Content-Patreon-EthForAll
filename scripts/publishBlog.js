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
 //const [owner, addr1]= await hre.ethers.getSigners();
//  const tx= await contract.postBlog(12345);
//  await tx.wait();

 const cid= "bafybeiaj3tsws7r7hg36hh2quyx3a2gvh77qublwzya6h5223myrwee5rq";
 const url= `https://${cid}.ipfs.dweb.link/plain-utf8.txt`;
 const res= await storage.get(cid)
 const files= await res.files();
 const result= await axios.get(url);
 console.log(result.data);

   

}
main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });

//pvt key sample 0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80
//public key 0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266