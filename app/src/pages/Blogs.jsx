import React, { useState } from 'react'
import { Web3Storage } from 'web3.storage';
import { File } from 'web3.storage';
import { Blob } from 'web3.storage';
import Header from '../components/Header';
import { ethers } from 'ethers';
import BlogApi from '../abi/BlogApi';
import {Alchemy, Network, Wallet, Utils} from "alchemy-sdk";
import secret from '../../secret';

function Blogs() {
  const { API_KEY, PRIVATE_KEY } = secret;
  const provider = new ethers.AlchemyProvider("goerli", API_KEY);

// Signer
const signer = new ethers.Wallet(PRIVATE_KEY, provider);

// Contract
const blogContract = new ethers.Contract('0xd0ce4c5b53e1885c4603bE03Fb6fa97b6FbD3ceD', BlogApi.abi, signer);

  const [content, setContent] = useState('');
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const storage = new Web3Storage({ token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweDBBMjBDZGMwOWI5NjUwRDA3MWE3RWRjMjkwMjlkMDY5NDA2NENlNTQiLCJpc3MiOiJ3ZWIzLXN0b3JhZ2UiLCJpYXQiOjE2NzYxMTM3OTc5NjcsIm5hbWUiOiJCTE9HIn0.YKrOQR6Xvc_Z6rMB0brS5xmfkmptBrHyBGLwPJ2syFA' });

  async function upload() {
    const obj = {
      title: title,
      description: desc,
      content: content
    }
    const finalContent = new Blob([JSON.stringify(obj)], { type: 'application/json' });
    console.log([finalContent]);
    const file = new File([finalContent], 'Blog.txt');
    const cid = await storage.put([file]);
    console.log('cid: ' + cid);
    return cid;


  }
  async function updateContract(cid){

    const tx1= blogContract.connect(signer).joinCreator('Cerebro');
    const receipt1= await tx1.wait();
    console.log('r1'+receipt1);

    const tx2= blogContract.connect(signer).postBlog(cid);
    const receipt2= await tx1.wait();
    console.log('r2'+receipt2);
    alert('Successful post!');

  }
  return (
    <>
    <Header/>
      <div className='Heading'>Tell a Story...</div>
      <div className='BlogCreation'>
        <input type="text" className='BlogTitle' placeholder='Title' onChange={(e) => {
          setTitle(e.target.value);
        }} />
        <textarea className='BlogDescription' placeholder='Description' onChange={(e) => {
          setDesc(e.target.value);
        }} />
        <textarea className='BlogStory' placeholder='Enter text...' onChange={(e) => {
          setContent(e.target.value);
        }} />
       <button id="Submit" onClick={async()=>{
          await upload().then((cid)=>{
            updateContract(cid);
          }).catch((err)=>{
            console.log(err);
          })
       }}>Sumbit</button>
      </div>
      
      

    </>
  )
}

export default Blogs