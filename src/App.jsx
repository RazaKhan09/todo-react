import { useState } from 'react'
import './App.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Home from './components/Home'
import Register from './components/Register'
import LandingPage from './components/LandingPage'

function App() {
const [isLoggedIn,setIsLoggedIn]=useState(false)
const [registered,setRegistered]=useState(false)
const [todos,setTodos]=useState([])
const[comp,setComp]=useState([])
const [user,setUser]=useState("")
const router=createBrowserRouter([
  {
    path:"/",
    element:<LandingPage registered={registered} setUser={setUser} setIsLoggedIn={setIsLoggedIn} isLoggedIn={isLoggedIn}/>,
  },
    
  {
    path:"/home",
    element:<Home user={user} isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} todos={todos} setTodos={setTodos} comp={comp} setComp={setComp}/>
  },
  {
    path:"/register",
    element:<Register setRegistered={setRegistered}/>
  },
])
  return (
    <>
      <RouterProvider router={router}/>
    </>
  )
}

export default App
