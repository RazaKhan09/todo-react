import React, { useState,useRef} from 'react'
import { NavLink,Link ,useNavigate} from 'react-router-dom'
import axios from 'axios'

function Header(props) {
  
  const navigate=useNavigate()
  const logoutbtn=useRef(null)

const handlesubmit=async ()=>{
    const res = await axios.post("https://todo-backend-r24b.onrender.com/logout", {
    },{
      withCredentials:true
    });
    props.setIsLoggedIn(false)
    navigate("/")
  }
 
  return (
    <div className="flex justify-between items-center px-6 py-4 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 shadow-lg  backdrop-blur-md border border-white/20">
  <h1 className="text-3xl font-bold text-white drop-shadow-lg">Todos App</h1>
  
  
  <div className="flex justify-center items-center">
    <span className='text-white font-medium mt-4 mr-7'>Signed in as {props.user}</span>
    <button
      onClick={handlesubmit}
      ref={logoutbtn}
      className="text-white bg-red-500 border-0 py-2 px-6 rounded-lg text-lg font-medium hover:bg-red-600 transition-colors duration-300 shadow-md"
    >
      Log Out
    </button>
  </div>
</div>
  )
}

export default Header
