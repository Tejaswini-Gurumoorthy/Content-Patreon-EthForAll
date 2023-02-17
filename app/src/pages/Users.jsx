import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Header from '../components/header';

export default function Users() {
  const navigate= useNavigate();
  const id= useParams().id;
  const logOut= async()=>{
    navigate('/Connect');
  }
  return (
    <>
    <Header/>
    <div>Welcome {id}</div>
    <button onClick={logOut}>Log out</button>
    </>
  )
}
