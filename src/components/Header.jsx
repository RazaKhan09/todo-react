import React, { useState,useRef} from 'react'
import { NavLink,Link ,useNavigate} from 'react-router-dom'
import axios from 'axios'

function Header(props) {
  
  const navigate=useNavigate()
  const signupbtn=useRef(null)
  const loginbtn=useRef(null)
  const logoutbtn=useRef(null)
  // if(props.isLoggedIn){
  //   // loginbtn.current.style.display="none"
  //   // signupbtn.current.style.display="none"
  //   logoutbtn.current.style.display="block"
  // }

const handlesubmit=async ()=>{
    const res = await axios.post("https://todo-backend-r24b.onrender.com/logout", {
    },{
      withCredentials:true
    });
    props.setIsLoggedIn(false)
    // logoutbtn.current.style.display="none"
    // loginbtn.current.style.display="block"
    // signupbtn.current.style.display="block"
    alert("Logged Out Successfully")
    navigate("/")
  }
 
  return (
    // <div className='flex justify-between items-center  h-15 rounded'>
    //   <h1 className='text-3xl  ml-1.5'>Todos App</h1>
    //   <div className='flex '>
    //     <button onClick={handlesubmit} ref={logoutbtn} className="text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded text-lg mr-2.5">Log Out</button>
    //   </div>
    // </div>
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
