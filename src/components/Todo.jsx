import React,{useState,useRef,useEffect} from 'react'
import axios from 'axios'

function Todo(props) {
  const [changeid,setChangeid]=useState("")
  const [change, setChange] = useState("")
  useEffect(()=>{
    const gettodos=async ()=>{
    const res=await axios.post("https://todo-backend-r24b.onrender.com/gettodos", {
    },{
      withCredentials:true
    });
    console.log(res)
    props.setTodos(res.data)
  }
  const getcompletedtodos=async ()=>{
    const res=await axios.post("https://todo-backend-r24b.onrender.com/completedtodos", {
    },{
      withCredentials:true
    });
    console.log(res)
    props.setComp(res.data)
  }
  
  if(props.isLoggedIn){
  gettodos();
  getcompletedtodos();
}
  },[])
  let progress = Math.floor(props.comp.length / (props.todos.length + props.comp.length) * 100) || 0
  let completed=props.comp.length
  let tobecompleted=props.todos.length
  return (
    <div className="flex flex-col justify-center items-center p-6 min-h-[400px] bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-800 text-white shadow-lg">
  <br />
  <h1 className="text-4xl font-bold mb-4 drop-shadow-lg">Todos: {tobecompleted}</h1>

  <ul className="list-none w-full">
    {props.todos.map((todo) => (
      <li
        className="mt-4 flex justify-between items-center bg-white/10 backdrop-blur-lg px-4 py-3 rounded-lg shadow-md hover:scale-[1.02] transition-all duration-300"
        key={todo._id}
      >
        <div className="flex flex-row gap-2 items-center">
          <input
            type="checkbox"
            onChange={async () => {
              const res = await axios.post(
                "https://todo-backend-r24b.onrender.com/completetodo",
                { _id: todo._id, isCompleted: true },
                { withCredentials: true }
              );
              console.log(res);

              const gettodos = await axios.post(
                "https://todo-backend-r24b.onrender.com/gettodos",
                {},
                { withCredentials: true }
              );
              props.setTodos(gettodos.data);

              const resc = await axios.post(
                "https://todo-backend-r24b.onrender.com/completedtodos",
                {},
                { withCredentials: true }
              );
              props.setComp(resc.data);
            }}
          />
          <div
            className="text-lg font-medium"
            style={{ display: changeid === todo._id ? "none" : "block" }}
          >
            {todo.content}
          </div>
          <input
            key={todo.id}
            value={change}
            onChange={(e) => setChange(e.target.value)}
            className="hidden text-white border border-gray-300 rounded px-2 py-1 bg-transparent"
            style={{ display: changeid === todo._id ? "block" : "none" }}
          />
        </div>

        <div className="flex gap-2">
          <button
            style={{ display: changeid === todo._id ? "none" : "block" }}
            onClick={() => {
              setChangeid(todo._id);
            }}
            className="p-2 bg-blue-500 hover:bg-blue-600 rounded-lg shadow-md transition"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M16.862 3.487a2.25 2.25 0 113.182 3.182L7.5 19.313 3 21l1.687-4.5L16.862 3.487z"
              />
            </svg>
          </button>

          <button
            className="hidden p-2 bg-green-500 hover:bg-green-600 rounded-lg shadow-md transition"
            style={{ display: changeid === todo._id ? "block" : "none" }}
            onClick={async () => {
              const res = await axios.post(
                "https://todo-backend-r24b.onrender.com/updatetodo",
                { _id: todo._id, content: change },
                { withCredentials: true }
              );
              console.log(res);

              const gettodos = await axios.post(
                "https://todo-backend-r24b.onrender.com/gettodos",
                {},
                { withCredentials: true }
              );
              props.setTodos(gettodos.data);

              const resc = await axios.post(
                "https://todo-backend-r24b.onrender.com/completedtodos",
                {},
                { withCredentials: true }
              );
              props.setComp(resc.data);

              setChange("");
              setChangeid("");
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4.5 12.75l6 6 9-13.5"
              />
            </svg>
          </button>

          <button
            className="p-2 bg-red-500 hover:bg-red-600 rounded-lg shadow-md transition"
            onClick={async () => {
              const res = await axios.post(
                "https://todo-backend-r24b.onrender.com/deletetodo",
                { _id: todo._id },
                { withCredentials: true }
              );
              console.log(res);

              const gettodos = await axios.post(
                "https://todo-backend-r24b.onrender.com/gettodos",
                {},
                { withCredentials: true }
              );
              props.setTodos(gettodos.data);
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
              />
            </svg>
          </button>
        </div>
      </li>
    ))}
  </ul>

  <br />
  <div className="text-3xl font-bold">Completed: {completed}</div>

  <ul className="list-none w-full">
    {props.comp.map((elem) => (
      <li
        className="mt-4 flex justify-between items-center bg-white/10 backdrop-blur-lg px-4 py-3 rounded-lg shadow-md"
        key={elem._id}
      >
        <div className="flex flex-row gap-2 items-center">
          <input
            type="checkbox"
            checked
            onChange={async () => {
              const res = await axios.post(
                "https://todo-backend-r24b.onrender.com/completetodo",
                { _id: elem._id, isCompleted: false },
                { withCredentials: true }
              );
              console.log(res);

              const gettodos = await axios.post(
                "https://todo-backend-r24b.onrender.com/gettodos",
                {},
                { withCredentials: true }
              );
              props.setTodos(gettodos.data);

              const resc = await axios.post(
                "https://todo-backend-r24b.onrender.com/completedtodos",
                {},
                { withCredentials: true }
              );
              props.setComp(resc.data);
            }}
          />
          <del className="text-lg">{elem.content}</del>
        </div>

        <button
          onClick={async () => {
            const res = await axios.post(
              "https://todo-backend-r24b.onrender.com/deletetodo",
              { _id: elem._id },
              { withCredentials: true }
            );
            console.log(res);

            const resc = await axios.post(
              "https://todo-backend-r24b.onrender.com/completedtodos",
              {},
              { withCredentials: true }
            );
            props.setComp(resc.data);
          }}
          className="p-2 bg-red-500 hover:bg-red-600 rounded-lg shadow-md transition"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
            />
          </svg>
        </button>
      </li>
    ))}
  </ul>

  <br />
  <div className="text-3xl font-bold mb-3">Progress: {progress}%</div>
  <div className="w-full bg-white/20 rounded-full h-4 shadow-inner">
    <div
      className="bg-gradient-to-r from-green-400 to-blue-500 h-4 rounded-full transition-all duration-500"
      style={{ width: `${progress}%` }}
    ></div>
  </div>
</div>
  )
}

export default Todo
