import React from 'react'
import {Link} from 'react-router-dom'

const Landing = ({isLoggedIn, handleAuth, handleAuthLogout}) => {
  return (
    <header className="landing">
      <div className="landing__text-box">
        <h1>Literally just another todo app.</h1>
        <Link to="/signup" className="btn">Get Started</Link>
      </div>
    </header>
  )
}

export default Landing
