import React, {useEffect, useState} from 'react';
import axios from 'axios';

import LoginForm from './components/LoginForm';
import SignupForm from './components/SignupForm';

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
        .catch(err => console.log(err));
    }
  }, [isLoggedIn]);

  return (
    <div>
      <h1>{isLoggedIn ? `Hello ${user.username}` : "Not Logged In"}</h1>
      <h2>Login</h2>
      <LoginForm handleLogin={handleLogin}/>
      <h2>Signup</h2>
      <SignupForm handleSignup={handleSignup} />

      <h2 onClick={handleLogout} style={{color:'blue'}}>Logout</h2>
    </div>
  )
}

export default App
