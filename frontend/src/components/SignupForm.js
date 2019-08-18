import React, { useState } from 'react'

const SignupForm = ({handleSignup}) => {
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
    <form onSubmit={e => handleSignup(e, username, password)}>
      <div className="username">
        <label htmlFor="username">username</label>
        <input
          type="text"
          name="username"
          value={username}
          onChange={handleChange}
        />
      </div>
      <div className="password">
        <label htmlFor="password">password</label>
        <input
          type="password"
          name="password"
          value={password}
          onChange={handleChange}
        />
      </div>
      <input type="submit"/>
    </form>
  )
}

export default SignupForm
