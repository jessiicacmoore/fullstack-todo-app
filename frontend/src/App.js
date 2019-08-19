import React, {useEffect, useState} from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Route } from "react-router-dom";


import IndexView from './containers/IndexView'
import TodosView from './containers/TodosView'

const App = () => {

  const [isLoggedIn, setisLoggedIn] = useState(localStorage.getItem('token') ? true : false);
  const [user, setUser] = useState({});
  const apiUrl = 'http://localhost:8000';

  const handleLogin = (e, username, password) => {
    e.preventDefault();
    axios.post(`${apiUrl}/token-auth/`, {
      username: username,
      password: password
    })
      .then(res => {
        localStorage.setItem('token', res.data.token)
        setisLoggedIn(true)
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
      axios.get(`${apiUrl}/api/current_user/`, {
        headers: {
          Authorization: `JWT ${localStorage.getItem('token')}`
        }
      })
        .then(res => {
          setUser(res.data);
        })
        .catch(err => {
          console.log(err);
          localStorage.removeItem('token');
          setisLoggedIn(false);
        });
    }
  }, [isLoggedIn]);

  return (
    <Router>
    	<Route path="/" exact component={() => <IndexView handleLogin={handleLogin} isLoggedIn={isLoggedIn} />} />
    	<Route path="/todos" exact component={() => <TodosView />} />
    </Router>
  )
}

export default App
