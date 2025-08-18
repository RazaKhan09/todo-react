import React, { useState } from 'react'
import axios from 'axios'

function AddTodo(props) {
    const [content, setContent] = useState('')
    const addTodoHandler =async (e) => {
        e.preventDefault()
        //adding todo to backend
        const response=await fetch("https://todo-backend-r24b.onrender.com/addtodos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content }),
        credentials:"include"
        })
        console.log(response);
        const createdTodo=await response.json()
        if(!createdTodo){
          console.log("todo not created")
        }
        console.log(createdTodo)
        setContent('')
        //getting todos from backend
        const gettodos=await axios.post("https://todo-backend-r24b.onrender.com/gettodos", {},{
          withCredentials:true
              });
          console.log(gettodos)
          props.set(gettodos.data)
    }
  return (
    // <form onSubmit={addTodoHandler} className="space-x-3 mt-12">
    //   <input
    //     type="text"
    //     className="bg-gray-800 rounded border border-gray-700 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-900 text-base outline-none text-gray-100 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
    //     placeholder="Enter a Todo..."
    //     value={content}
    //     onChange={(e) => setContent(e.target.value)}
    //   />
    //   <button
    //     type="submit"
    //     className="text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded text-lg"
    //   >
    //     Add Todo
    //   </button>
    // </form>
    <div className="flex flex-col justify-center items-center h-44 min-w-[796px] bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
  <h1 className="text-4xl font-bold text-white mb-8 drop-shadow-lg">Add a New Todo</h1>

  <form
    onSubmit={addTodoHandler}
    className="flex flex-col md:flex-row items-center gap-4 bg-white/20 backdrop-blur-md p-6 rounded-2xl shadow-lg"
  >
    <input
      type="text"
      className="bg-white/80 rounded-lg border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-300 text-gray-900 py-2 px-4 leading-8 transition-all duration-200 ease-in-out w-72 md:w-96 shadow-sm"
      placeholder="Enter a Todo..."
      value={content}
      onChange={(e) => setContent(e.target.value)}
      required
    />
    <button
      type="submit"
      className="text-white bg-indigo-600 border-0 py-2 px-8 rounded-lg shadow-md hover:bg-indigo-700 transition-all duration-200"
    >
      Add Todo
    </button>
  </form>
</div>
  )
}

export default AddTodo
