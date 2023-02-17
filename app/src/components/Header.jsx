import React from 'react'
import '../index.css'

function Header() {
  return (
    <div className='Header'>
      <li>
        <ul>My Dashboard</ul>
        <ul><a href= '/Blogs'>My Blogs</a></ul>
        <ul>My Videos</ul>
        <ul>My community</ul>
      </li>
    </div>
  )
}

export default Header