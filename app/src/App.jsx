import './App.css'
import WalletConnect from './pages/WalletConnect';
import Users from './pages/Users';
import Blogs from './pages/Blogs';
import {BrowserRouter as Router, Route, Routes,} from 'react-router-dom';

function App() {

  return (
   <>
    <Router>
      <Routes>
        <Route path="/" />
        <Route path="/Connect" element= {<WalletConnect/>} />
        <Route path="/users/:id" element= {<Users/>} />
        <Route path="/Blogs" element= {<Blogs/>}/>
        <Route path="*" />
      </Routes>
    </Router>
   </>
  )
}

export default App