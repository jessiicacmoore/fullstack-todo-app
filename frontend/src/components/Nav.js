import React from 'react'
import {Link} from 'react-router-dom';
const Nav = ({isLoggedIn, handleAuthLogout}) => {
  console.log(window.location.pathname);
  return (
    <nav className="nav">
      <div className="nav__container container">
        <ul className="nav__links">
          {
            isLoggedIn?
            <li className="nav__item"><Link onClick={handleAuthLogout}>Logout</Link></li>
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
