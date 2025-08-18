import React, { useState } from 'react'
import { NavLink,useNavigate } from 'react-router-dom'

function Register(props) {
  const navigate=useNavigate()
  const [message,setMessage]=useState("")
  const [email,setEmail]=useState("")
  const [password,setPassword]=useState("")
  const handlesubmit=async (e)=>{
    e.preventDefault()
    const response=await fetch("https://todo-backend-r24b.onrender.com/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
      });
      console.log(response)
      const data=await response.json();
      console.log(data)
      if(!response.ok){
        setMessage(data.error)
        return
      }
      props.setRegistered(true)
      navigate("/")
      
      
  }
  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-gradient-to-br from-yellow-100 via-amber-200 to-orange-300 px-4">
  <h1 className="text-4xl font-bold text-amber-800 mb-6 drop-shadow-lg">
    Welcome to Todo App
  </h1>

  <form
    className="flex flex-col justify-center items-center bg-white/80 backdrop-blur-lg shadow-lg rounded-2xl p-6 w-full max-w-sm border border-amber-300"
    onSubmit={handlesubmit}
  >
    <label htmlFor="email" className="self-start text-amber-800 font-medium">
      Email
    </label>
    <input
      className="border border-amber-300 rounded-lg px-3 py-2 mt-1 w-full focus:outline-none focus:ring-2 focus:ring-amber-400"
      id="email"
      type="text"
      placeholder="Enter email here"
      name="email"
      onChange={(e) => setEmail(e.target.value)}
    />

    <label
      htmlFor="password"
      className="self-start text-amber-800 font-medium mt-4"
    >
      Create Password
    </label>
    <input
      className="border border-amber-300 rounded-lg px-3 py-2 mt-1 w-full focus:outline-none focus:ring-2 focus:ring-amber-400"
      id="password"
      type="password"
      placeholder="Enter password here"
      name="password"
      onChange={(e) => setPassword(e.target.value)}
    />

    <input
      className="bg-amber-500 text-white font-semibold rounded-lg px-4 py-2 mt-6 hover:bg-amber-600 transition-all cursor-pointer w-full shadow-md"
      type="submit"
      value="Sign Up"
    />
  </form>

  <span className="text-amber-900 mt-4">{message}</span>
  <div className="mt-4 text-sm text-gray-600">
    <span>Already have an account? </span>
    <NavLink
      to="/"
      className="text-amber-600 font-semibold hover:underline"
    >
      Click here to Login
    </NavLink>
  </div>
</div>
  )
}

export default Register