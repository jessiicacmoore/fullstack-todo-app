import React from 'react'
import {Link} from 'react-router-dom';
const Nav = ({isLoggedIn, handleAuthLogout}) => {
  console.log(window.location.pathname);
  return (
    <nav className="nav">
      <div className="nav__container container">
        <a className="github-link" href="https://github.com/jessiicacmoore/fullstack-todo-app" target="_blank" rel="noopener noreferrer">
          <i className="fab fa-github"></i>
        </a>
        <h1 className="logo">latda.</h1>
        <ul className="nav__links">
          {
            isLoggedIn?
            <li className="nav__item"><button onClick={handleAuthLogout}>Logout</button></li>
            :
            <React.Fragment>
              <li className="nav__item">
                <Link to="/signin">Sign In</Link>
              </li>
              <li className="nav__item emphasis">
                <Link to="/signup">Sign Up</Link>
              </li>
            </React.Fragment>
          }
        </ul>
      </div>
    </nav>
  )
}
export default Nav
