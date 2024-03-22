import React from 'react'
import { Link } from 'react-router-dom'
import "./Nav.css"

const Nav = () => {
  return (
    <nav>
      <div className="nav-container">
        <div className='nav-item'>
          <span className='nav-img'> <img src="src\assets\Vector.png" /> 912121131313</span>
        </div>
        <div className='nav-item'>
          Get 50% off on selected items | Shop Now
        </div>
        <div className='nav-item'>
          <Link className=' nav-item login-signup' to={"/login"}> Login </Link>
          |
          <Link className=' nav-item login-signup' to={"/signup"}>Signup</Link>
        </div>
      </div>

    </nav>
  )
}

export default Nav