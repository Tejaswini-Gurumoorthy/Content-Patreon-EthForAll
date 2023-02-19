import React, { useEffect, useState } from 'react'
import {ethers} from 'ethers'
import { useNavigate } from 'react-router-dom';

function WalletConnect() {
    const {ethereum}= window;
    const navigate= useNavigate();
    const [currentAcc, setCurrentAcc]= useState();

    useEffect(()=>{
      setCurrentAcc(undefined);
    },[]);

    useEffect(()=>{
       if(currentAcc!=undefined)
       {
        const link= '/Blogs';
        navigate(link);
       }
    }, [currentAcc]);
  
    const showConnect= async()=>{
      if(!ethereum) return alert("Please install metamask!");
      await ethereum.request({
        method: 'eth_requestAccounts'
      }).then(async(accounts)=>{
        setCurrentAcc(accounts[0]);
       
      }).catch((err)=>{
        alert('Connection failed!');
      });      
    }
    


  return (
    <button onClick={showConnect}>Connect Wallet</button>
  )
}


export default WalletConnect