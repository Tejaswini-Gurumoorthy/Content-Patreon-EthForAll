import React, { useState } from 'react'
import {ethers} from 'ethers'
import { useNavigate } from 'react-router-dom';

function WalletConnect() {
    const {ethereum}= window;
    const navigate= useNavigate();
    const [currentAcc, setCurrentAcc]= useState();
    const showConnect= async()=>{
      if(!ethereum) return alert("Please install metamask!");
      const accounts= await ethereum.request({method: 'eth_requestAccounts'});
      setCurrentAcc(accounts[0]);
      console.log('accounts: '+accounts[0]);
      setCurrentAcc(accounts[0]);
      await console.log('Current: '+currentAcc);
      const link= '/Users/'+ accounts[0];
      console.log('link: '+link);
      navigate(link);
    }
    


  return (
    <button onClick={showConnect}>Connect Wallet</button>
  )
}


export default WalletConnect