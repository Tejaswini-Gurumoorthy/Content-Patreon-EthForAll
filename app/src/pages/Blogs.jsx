import { sha256 } from 'ethers/lib/utils';
import React, { useState } from 'react'
import { Web3Storage } from 'web3.storage';
import { File } from 'web3.storage';
import { Blob } from 'web3.storage';

function Blogs() {
  const [content, setContent]= useState('');
  const [title, setTitle]= useState('');
  const [desc, setDesc]= useState('');
  const storage= new Web3Storage({token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweDBBMjBDZGMwOWI5NjUwRDA3MWE3RWRjMjkwMjlkMDY5NDA2NENlNTQiLCJpc3MiOiJ3ZWIzLXN0b3JhZ2UiLCJpYXQiOjE2NzYxMTM3OTc5NjcsIm5hbWUiOiJCTE9HIn0.YKrOQR6Xvc_Z6rMB0brS5xmfkmptBrHyBGLwPJ2syFA'});
  
  const upload=async()=>{
    const obj= {
      title: title,
      description: desc,
      content: content
    }
    const finalContent = new Blob([JSON.stringify(obj)], { type: 'application/json'});
    await console.log([finalContent]);
    const file = new File([finalContent], 'plain-utf8.txt');
    const cid = await storage.put([file]);
    console.log('cid: '+cid);
    

  }
  return (
    <>
    <div>Blogs</div>
    <input type="text" placeholder= 'Enter Title...' onChange={(e)=>{
        setTitle(e.target.value);
    }} />
    <input type="textarea" placeholder= 'Enter Description...' onChange={(e)=>{
        setDesc(e.target.value);
    }} />
    <input type= "textarea" placeholder='Enter text...' onChange={(e)=>{
          setContent(e.target.value);
    }}/>
    <button onClick= {upload}>Sumbit</button>
    </>
  )
}

export default Blogs