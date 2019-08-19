import React from 'react'
import LoginForm from '../components/LoginForm';


const IndexView = ({handleLogin, isLoggedIn}) => {
  return (
    <React.Fragment>
      <header className="header--full-height">
        <div className="header__textbox">
          <h1>Literally just another<br/>to-do app.</h1>
        </div>
        <div className="header__form">
          <LoginForm handleLogin={handleLogin} />
        </div>
      </header>
      <footer>

      </footer>
    </React.Fragment>
  )
}

export default IndexView
