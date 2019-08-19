import React, { useState } from 'react'

const LoginForm = ({handleLogin}) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleChange = e => {
    const value = e.target.value;
    switch (e.target.name) {
      case "username":
        setUsername(value);
        break;
      case "password":
        setPassword(value);
        break;
      default:
        break;
    }
  }

  return (
    <form onSubmit={e => handleLogin(e, username, password)}>
      <div className="form__custom-input username">
        <input
          type="text"
          name="username"
          value={username}
          onChange={handleChange}
          required
        />
        <label htmlFor="username">Username</label>
      </div>
      <div className="form__custom-input password">
        <input
          type="password"
          name="password"
          value={password}
          onChange={handleChange}
          required
        />
        <label htmlFor="password">Password</label>
      </div>
      <button type="submit">Sign in</button>
    </form>
  )
}

export default LoginForm
