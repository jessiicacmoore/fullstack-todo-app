import React, {useEffect, useState} from 'react';
import axios from 'axios';

import LoginForm from './components/LoginForm';

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
        console.log(res);
        localStorage.setItem('token', res.data.token)
        setisLoggedIn(localStorage.getItem('token') ? true : false)
      })
  }

  const handleLogout = () => {
    localStorage.removeItem('token');
    setisLoggedIn(false)
  }

  useEffect(() => {
    if (isLoggedIn) {
      axios.get(`${apiUrl}/api/current_user/`, {
        headers: {
          Authorization: `JWT ${localStorage.getItem('token')}`
        }
      })
        .then(res => {
          console.log(res)
          setUser(res.data);
        })
    }
  }, []);

  return (
    <div>
      <h1>{isLoggedIn ? `Hello ${user.username}` : "Not Logged In"}</h1>
      <LoginForm handleLogin={handleLogin}/>
      <h2 onClick={handleLogout}>Logout</h2>
    </div>
  )
}

export default App
