import React, {useEffect, useState} from 'react'
import axios from 'axios';

import TodoItem from '../components/TodoItem';

const Todos = ({isLoggedIn, setIsLoggedIn, AUTH }) => {
  const [todos, setTodos] = useState([]);

  const API = axios.create({
    baseURL: 'http://localhost:8000/api/',
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
    }
  })

  API.interceptors.response.use(
    response => response,
    error => {
      const status = error.response ? error.response.status : null;
      const originalRequest = error.config; 

      if (status === 401) {
        return AUTH.post('token/refresh/', {
          "refresh" : localStorage.getItem('refreshToken' || '')
        })
          .then(resp => {
            const token = resp.data.access
            localStorage.setItem('accessToken', token)
            return token
          }).then(token => {
            originalRequest.headers['Authorization'] = `Bearer ${token}`;
            return axios.request(originalRequest);
          }); 
      }
      localStorage.removeItem('accessToken')
      localStorage.removeItem('refreshToken')
      setIsLoggedIn(false)
      return Promise.reject(error);
    } 
  );

  const getTodos = () => {
    API.get('todo/')
      .then(resp => setTodos([...resp.data]))
      .catch(err => console.log(err))
  };

  const handleNewTodo = (e, newTodo) => {
    e.preventDefault();
    API.post('/todo/', {
      task: newTodo
    })
      .then(resp => {
        console.log(resp);
      })
      .catch(err => console.log(err))
  }

  const handleTodoUpdate = (todo) => {
    API.put(`/todo/${todo.id}/`, {
      task: todo.task,
      completed: !todo.completed
    })
    .then(getTodos())
  }

  useEffect(() => {
    getTodos();
  }, []);

  return (
    <main className="todos">
      {todos.length > 0 && <ul className="todos__list">{todos.map(todo => <TodoItem todo={todo} handleTodoUpdate={handleTodoUpdate} key={todo.id}/>)}</ul> }
    </main>
  )
}

export default Todos
