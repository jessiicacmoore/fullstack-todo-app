import React, {useEffect, useState} from 'react'
import axios from 'axios'

import TodoForm from '../components/ToDoForm'

const TodosView = ({isLoggedIn}) => {
  const [todos, setTodos] = useState([]);

  const getTodos = () => {
    axios.get('http://localhost:8000/api/todo/', {
      headers : {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    })
    .then(res => {
      console.log(res);
      setTodos(res.data)
    })
    .catch(err => console.log(err))
  }

  const handleSubmit = (e, newTodo) => {
    e.preventDefault();
    console.log(newTodo);
    const postData = {
      task: newTodo
    }
    const postConfig = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    }
    axios.post('http://localhost:8000/api/todo/', postData, postConfig)
      .then(res => {
        setTodos([...todos, res.data])
      })
      .catch(err => console.log(err));
  }

  useEffect(() => {
    getTodos();
  }, [])

  return (
    <main>
      <div className="todos">
        <h1>todos</h1>
        <TodoForm handleSubmit={handleSubmit}/>
        {todos.length > 0 && todos.map(todo => <li key={todo.id} className={`todo ${todo.completed ? "complete" : ""}`}>{todo.task}</li>)}
      </div>
    </main>
  )
}

export default TodosView
