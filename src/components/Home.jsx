import React,{useState} from 'react'
import AddTodo from './AddTodo'
import Todo from './Todo'
import Header from './Header'

function Home(props) {
    
    
  return (
    <div>
      <Header user={props.user} setIsLoggedIn={props.setIsLoggedIn} isLoggedIn={props.isLoggedIn}/>
      <AddTodo set={props.setTodos}/>
      <Todo isLoggedIn={props.isLoggedIn} todos={props.todos} comp={props.comp} setTodos={props.setTodos} setComp={props.setComp}/>
    </div>
  )
}

export default Home
