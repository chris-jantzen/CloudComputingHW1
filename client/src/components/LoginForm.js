import React, { useState, useContext } from 'react'
import { useHistory } from 'react-router-dom'
import { UserContext } from '../store/userContext'
import axios from 'axios'
import './styles/LoginForm.css'

const LoginForm = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [authError, setAuthError] = useState(false)
  const { createUser } = useContext(UserContext)
  const history = useHistory()

  const onSubmit = (e) => {
    e.preventDefault()
    axios
      .post('/user/getUser', {
        searchProps: {
          username,
          password,
        },
      })
      .then((payload) => {
        if (payload.data.user) {
          createUser({ username, password })
          history.push({ pathname: '/home' })
        } else {
          setAuthError(true)
          setTimeout(() => {
            setAuthError(false)
          }, 5000)
        }
      })
      .catch((err) => console.error(err.message))
  }

  const handleChange = (handler) => (e) => {
    handler(e.target.value)
  }

  return (
    <div className='loginContainer'>
      <h2>Login</h2>
      {authError && <span className='authError'>Authentication Error</span>}
      <form onSubmit={onSubmit}>
        <label htmlFor='username'>Username</label>
        <input
          type='text'
          name='username'
          id='username'
          onChange={handleChange(setUsername)}
          value={username}
        />
        <label htmlFor='password'>Password</label>
        <input
          type='password'
          name='password'
          id='password'
          onChange={handleChange(setPassword)}
          value={password}
        />
        <button type='submit' className='btn'>
          Log In
        </button>
      </form>
    </div>
  )
}

export default LoginForm
