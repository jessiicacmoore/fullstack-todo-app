import axios from 'axios';
import React, {useEffect, useState} from 'react';
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";

import Landing from "./containers/Landing"
import Todos from "./containers/Todos"

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem('accessToken') ? true : false);

  const AUTH = axios.create({
    baseURL: 'http://localhost:8000/auth/'
  })

  const handleAuth = (e, authMethod, username, password) => {
    e.preventDefault();
    const url = authMethod === 'login' ? 'token/' : 'register/';
      AUTH.post(url, {
        username: username,
        password: password
      })
        .then(resp => {
          console.log(resp)
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
  }, [isLoggedIn])

  return (
    <Router>
      <Route
        path="/"
        exact
        component={() => (
          !isLoggedIn ?
          <Landing isLoggedIn={isLoggedIn} handleAuth={handleAuth} handleAuthLogout={handleAuthLogout}/> : <Redirect to ="/todos" />
        )}
      />
      <Route
        path="/todos"
        exact
        component={() => (
          isLoggedIn ? <Todos isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} AUTH={AUTH}/> : <Redirect to="/" />
        )}
      />
    </Router>
  );
}

export default App;
