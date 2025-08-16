import React, { useState } from 'react'
import { NavLink,useNavigate } from 'react-router-dom'
import axios from 'axios'

function LandingPage(props) {
  const navigate=useNavigate();
  const [message,setMessage]=useState("")
  const [email,setEmail]=useState("")
  const [password,setPassword]=useState("")
  const handlesubmit=async (e)=>{
    e.preventDefault()
    const response=await fetch("https://todo-backend-r24b.onrender.com/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
        credentials:"include"
      });
      console.log(response)
      const data=await response.json();
      if(!response.ok){
        setMessage(data.error)
       return
      }
      props.setUser(email)
      props.setIsLoggedIn(true)
      navigate("/home")
  }

  return (
    // <div className='flex flex-col justify-center items-center h-screen w-screen'>
    //   <h1 className='text-3xl'>Welcome to Todo App</h1>
    //   <br/>
    //   <form  className="flex flex-col justify-center items-center bg-amber-200 h-48 w-72"onSubmit={handlesubmit}>
    //     <label htmlFor="email" >Email </label>
    //     <input className="border"id="email"type="text" placeholder='Enter email here' name="email" onChange={(e)=>setEmail(e.target.value)}/>
    //     <br/>
    //     <label htmlFor="password" >Password</label>
    //     <input className="border" id="password"type="password" placeholder='Enter password here' name="password" onChange={(e)=>setPassword(e.target.value)}/>
    //     <br/>
    //     <input className="border" type="submit" value="Log In"/>
    //   </form>
    //   <br/>
    //   <span className='text-black'>{message}</span>
    //   <span>Doesn't have an account?</span>
    //   <NavLink to="/register">
    //     <span>Click here to Register</span>
    //   </NavLink>
    // </div>
    <div className="flex flex-col justify-center items-center h-screen w-screen bg-gradient-to-br from-amber-100 via-white to-amber-200">
  <h1 className="text-4xl font-extrabold text-amber-700 mb-6 drop-shadow-sm">
    Welcome to Todo App
  </h1>

  <form
    className="flex flex-col gap-4 bg-white shadow-lg rounded-2xl p-8 w-80 border border-amber-300"
    onSubmit={handlesubmit}
  >
    <label htmlFor="email" className="text-sm font-medium text-gray-700">
      Email
    </label>
    <input
      className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-amber-400"
      id="email"
      type="text"
      placeholder="Enter email here"
      name="email"
      onChange={(e) => setEmail(e.target.value)}
    />

    <label htmlFor="password" className="text-sm font-medium text-gray-700">
      Password
    </label>
    <input
      className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-amber-400"
      id="password"
      type="password"
      placeholder="Enter password here"
      name="password"
      onChange={(e) => setPassword(e.target.value)}
    />

    <input
      className="bg-amber-500 text-white font-semibold py-2 rounded-lg cursor-pointer hover:bg-amber-600 transition duration-300"
      type="submit"
      value="Log In"
    />
  </form>

  <span className="text-green-600 font-medium mt-4">{message}</span>

  <div className="mt-4 text-sm text-gray-600">
    <span>Don't have an account? </span>
    <NavLink
      to="/register"
      className="text-amber-600 font-semibold hover:underline"
    >
      Click here to Register
    </NavLink>
  </div>
</div>
  )
}

export default LandingPage