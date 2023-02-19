import './App.css'
import WalletConnect from './pages/WalletConnect';
import Users from './pages/Users';
import Blogs from './pages/Blogs';
import Setup from './pages/Setup';
import Community from './pages/Community';
import LeftBar from './components/LeftBar';
import { BrowserRouter as Router, Route, Routes, } from 'react-router-dom';
import { useState } from 'react';
import RightBar from './components/RightBar';

function App() {
  const [currentAcc, setCurrentAcc] = useState();
  const [isNew, setIsNew] = useState(false);
  const [isCreator, setIsCreator] = useState(false);
  const [isConnected, setIsConnected] = useState(true)

  return (
    <>
      <Router>
      <Routes>
        <Route path="/" element= {<WalletConnect/>}/>
        <Route path="/users/:id" element= {<Users/>} />
        <Route path="/Blogs" element= {<Blogs/>}/>
        <Route path="/:id/Community" element= {<Community/>}/>
        <Route path="*" />
      </Routes>
    </Router>
    </>
  )
}

export default App

{/*  */}