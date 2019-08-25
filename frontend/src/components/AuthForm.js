import React, {useState} from 'react'

const AuthForm = ({authFunction, handleAuth}) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleInputChange = (e) => {
    const value = e.target.value;
    switch (e.target.name) {
      case "username":
        setUsername(value)
        break;
      case "password":
        setPassword(value)
        break;
      default:
        return
    }
  };

  return (
    <form onSubmit={(e) => handleAuth(e, authFunction, username, password)}>
      <label htmlFor="username">
        <input
          type="text"
          id="username"
          name="username"
          value={username}
          onChange={handleInputChange}
        />
        <span>Username</span>
      </label>
      <label htmlFor="password">
        <input
          type="password"
          name="password"
          id="password"
          value={password}
          onChange={handleInputChange}
        />
        <span>Password</span>
      </label>
      <button type="submit">
        {authFunction === "login" ? "Sign In" : "Sign Up"}
      </button>
    </form>
  );
}

export default AuthForm
