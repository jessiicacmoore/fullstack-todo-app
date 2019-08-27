import React, {useEffect, useState} from 'react'
import axios from 'axios';

import TodoItem from '../components/TodoItem';
import TodoForm from '../components/TodoForm';

const Todos = ({isLoggedIn, setIsLoggedIn, AUTH }) => {
  const [todos, setTodos] = useState([]);

  const API = axios.create({
    baseURL: 'https://latda-backend.herokuapp.com/api/',
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

  const handleNewTodo = (e, newTodo) => {
    e.preventDefault();
    API.post('/todo/', {
      task: newTodo
    })
      .then(resp => {
        console.log(resp.data);
        setTodos([resp.data, ...todos])
      })
      .catch(err => console.log(err))
  }

  const handleTodoUpdate = (todo) => {
    console.log(todo.id)
    API.put(`/todo/${todo.id}/`, {
      task: todo.task,
      completed: !todo.completed
    })
    .then(resp => {
      const updatedTodo = resp.data;
      const todosCopy = todos.slice();
      todosCopy.splice(todosCopy.indexOf(todo), 1, updatedTodo);
      setTodos([...todosCopy]);
    })
  }

  const handleTodoDelete = (todo) => {
    API.delete(`/todo/${todo.id}/`)
      .then(resp => {
        const todosCopy = todos.slice();
        todosCopy.splice(todosCopy.indexOf(todo), 1);
        setTodos([...todosCopy]);
      })
  }

  useEffect(() => {
    API.get('todo/')
      .then(resp => {
        const data = resp.data.reverse();
        setTodos([...data]);
      })
      .catch(err => console.log(err))
  }, []);

  return (
    <main className="todos">
      <TodoForm handleNewTodo={handleNewTodo}/>
      {
        todos.length > 0 && <ul className="todos__list">{todos.map(todo => <TodoItem todo={todo} handleTodoUpdate={handleTodoUpdate} handleTodoDelete={handleTodoDelete} key={todo.id} />)}</ul>
      }
    </main>
  )
}

export default Todos
