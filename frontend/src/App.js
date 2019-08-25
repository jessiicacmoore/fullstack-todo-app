import React, {useEffect, useState} from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Route } from "react-router-dom";
import { createBrowserHistory } from 'history';

import IndexView from './containers/IndexView'
import TodosView from './containers/TodosView'

const App = () => {
  const [isLoggedIn, setisLoggedIn] = useState(localStorage.getItem('token') ? true : false);
  const apiUrl = 'http://localhost:8000';
  const history = createBrowserHistory();

  const handleLogin = (e, username, password) => {
    e.preventDefault();
    axios.post(`${apiUrl}/token-auth/`, {
      username: username,
      password: password
    })
      .then(res => {
        console.log(res);
        localStorage.setItem('token', res.data.token)
        setisLoggedIn(true)
        // history.push('/todos')
      })
      .catch(err => console.log(err));
  }

  const handleLogout = () => {
    localStorage.removeItem('token');
    setisLoggedIn(false)
  }

  const handleSignup = (e, username, password) => {
    e.preventDefault();
    axios.post(`${apiUrl}/api/users/`, {
      username: username,
      password: password
    })
    .then(res => {
      console.log(res);
      localStorage.setItem('token', res.data.token)
      setisLoggedIn(true)
    }).catch(err => console.log(err))
  }

  useEffect(() => {
    if (isLoggedIn) {
      axios.post(`${apiUrl}/token-auth-refresh/`, {
        token: localStorage.getItem('token')
      })
        .then(res => {
          console.log(res)
          localStorage.setItem('token', res.data.token)
        })
        .catch(err => {
          console.log(err);
          handleLogout();
        })
    }
  }, []);

  return (
    <Router>
      <Route
        path="/"
        exact
        component={() => (
          <IndexView handleLogin={handleLogin} isLoggedIn={isLoggedIn} handleLogout={handleLogout}/>
        )}
      />
      <Route
        path="/todos"
        exact
        component={() => <TodosView isLoggedIn={isLoggedIn}/>}
      />
    </Router>
  );
}

export default App
