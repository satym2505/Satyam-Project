import React from 'react'
import './Header.css'
import { Link, useNavigate } from 'react-router-dom'

const Header = ({ userName }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
      // Clear user data (e.g., token) from local storage or state
      localStorage.removeItem('user'); // Adjust according to your storage mechanism
      navigate('/login'); // Redirect to login page
  };
  return (
    <>
      <div id='nav1'>
           <ul>
                <Link to="/home"><li className='list'>Home</li></Link>
                <Link to="/dashboard"><li className='list'>Employee list</li></Link>
                <Link to="/updateEmployeeDetails"><li className='list'>Edit Employee details</li></Link>
                <li className='list'>Welcome,{userName}</li>
                <li onClick={handleLogout} className='list'>Logout</li>
           </ul>
      </div>
    </>
  )
}

export default Header
