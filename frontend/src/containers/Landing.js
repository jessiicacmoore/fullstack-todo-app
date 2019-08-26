import React from 'react'

import AuthForm from '../components/AuthForm'

const Landing = ({isLoggedIn, handleAuth, handleAuthLogout}) => {
  return (
    <AuthForm authFunction="login" handleAuth={handleAuth} />
  )
}

export default Landing
