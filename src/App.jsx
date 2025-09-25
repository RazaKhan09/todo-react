import { useState,useEffect } from 'react'
import './App.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Home from './components/Home'
import Register from './components/Register'
import LandingPage from './components/LandingPage'
import axios from 'axios'

function App() {
const [isLoggedIn,setIsLoggedIn]=useState(false)
const [registered,setRegistered]=useState(false)
const [todos,setTodos]=useState([])
const[comp,setComp]=useState([])
const [user,setUser]=useState("")
const [loading, setLoading] = useState(true);

useEffect(() => {
    const restoreSession = async () => {
      try {
        const response=await axios.post(
          "https://todo-backend-r24b.onrender.com/refresh-token",
          {},
          { withCredentials: true } // 🔑 so cookies are included
        );
        setIsLoggedIn(true);
        console.log(response)
        console.log(response.data.user.email)
      } catch (err) {
        console.error("Session restore failed ❌", err);
        setIsLoggedIn(false)
      } finally {
        setLoading(false);
      }
    };

    restoreSession();
  }, []);
  if (loading) return <p>Loading...</p>;

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
