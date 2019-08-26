import React from 'react'
import {Link} from 'react-router-dom'

const Landing = ({isLoggedIn, handleAuth, handleAuthLogout}) => {
  return (
    <header className="landing">
      <div className="landing__text-box">
        <h1>latda.</h1>
        <p>literally another todo app.</p>
        <Link to="/signup" className="btn">Get Started</Link>
      </div>
    </header>
  )
}

export default Landing
