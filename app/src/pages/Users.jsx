import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Header from '../components/Header';

export default function Users() {
  const navigate= useNavigate();
  const id= useParams().id;
  const logOut= async()=>{
    navigate('/');
  }
  return (
    <>
    <Header/>
    <div>Welcome {id}</div>
    <button onClick={logOut}>Log out</button>
    </>
  )
}
