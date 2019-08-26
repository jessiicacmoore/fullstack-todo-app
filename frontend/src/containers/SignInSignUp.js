import React, {useState} from 'react'

const SignInSignUp = ({authFunction, handleAuth}) => {
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
    <main className="auth">
      <form className="auth__form" onSubmit={(e) => handleAuth(e, authFunction, username, password)}>
        <h2>{authFunction === 'login' ? "Sign In" : "Sign Up"}</h2>
        <label className="auth__form__custom-input" htmlFor="username">
          <input
            type="text"
            id="username"
            name="username"
            value={username}
            onChange={handleInputChange}
            required
          />
          <span>Username</span>
        </label>
        <label className="auth__form__custom-input" htmlFor="password">
          <input
            type="password"
            name="password"
            id="password"
            value={password}
            onChange={handleInputChange}
            required
          />
          <span>Password</span>
        </label>
        <button type="submit">
          {authFunction === "login" ? "Sign In" : "Sign Up"}
        </button>
      </form>
    </main>
  )
}

export default SignInSignUp
