import React, {useEffect, useState} from 'react';
import axios from 'axios';

import AuthForm from "./components/AuthForm";
import TodoForm from "./components/TodoForm";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem('accessToken') ? true : false);

  const AUTH = axios.create({
    baseURL: 'http://localhost:8000/auth/'
  })

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
  )

  const handleAuth = (e, authMethod, username, password) => {
    e.preventDefault();
    const url = authMethod === 'login' ? 'token/' : 'register/';
      AUTH.post(url, {
        username: username,
        password: password
      })
        .then(resp => {
          localStorage.setItem('refreshToken', resp.data.refresh || resp.data.tokens.refresh)
          localStorage.setItem('accessToken', resp.data.access || resp.data.tokens.access)
          setIsLoggedIn(true)
        })
        .catch(err => console.log(err))
  }

  const handleAuthLogout = () => {
    localStorage.removeItem('accessToken')
    localStorage.removeItem('refreshToken')
    setIsLoggedIn(false)
  }


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


  useEffect(() => {
    if (isLoggedIn) {
      AUTH.post('token/refresh/', {
        "refresh" : localStorage.getItem('refreshToken' || '')
      })
        .then(resp => {
          const token = resp.data.access
          localStorage.setItem('accessToken', token)
        })
        .catch(err => {
          console.log(err);
          handleAuthLogout();
        })
    }
  }, [])

  return (
    <React.Fragment>
      {isLoggedIn ?
        <div>
          <button onClick={handleAuthLogout}>Logout</button>
          <TodoForm handleNewTodo={handleNewTodo}/>
          <ul>

          </ul>
        </div>
        :
        <AuthForm authFunction="login" handleAuth={handleAuth} />
      }
    </React.Fragment>
  );
}

export default App;
