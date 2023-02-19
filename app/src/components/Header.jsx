import React from 'react'
import '../index.css'
import { useNavigate } from 'react-router-dom'

function Header() {
  const navigate= useNavigate();

  const Logout=()=>{
    const link= "/";
    navigate(link);
  }

  return (
    <div className='Header'>
        <div className='header-item'>My Dashboard</div>
        <div className='header-item'><a href= '/Blogs'>My Blogs</a></div>
        <div className='header-item'><a href= '/Community/1'>My community</a></div>
        <div className='header-item'><button onClick={Logout}>0xcdd...8F1</button></div>
    </div>
  )
}

export default Header