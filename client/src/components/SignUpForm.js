import React, { useState, useContext } from 'react'
import { useHistory } from 'react-router-dom'
import axios from 'axios'
import { UserContext } from '../store/userContext'
import './styles/SignUpForm.css'

const SignUpForm = () => {
  const { createUser } = useContext(UserContext)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  let history = useHistory()

  const handleChange = (handler) => (e) => {
    handler(e.target.value)
  }

  const clearStates = () => {
    ;[setUsername, setPassword, setFirstName, setLastName, setEmail].forEach(
      (setter) => {
        setter('')
      }
    )
  }

  const onSubmit = (e) => {
    e.preventDefault()
    axios.post('http://ec2-18-218-112-28.us-east-2.compute.amazonaws.com:5000/user/createUser', {
      user: {
        username,
        password,
        firstName,
        lastName,
        email,
      },
    })
    createUser({
      username,
      password,
      firstName,
      lastName,
      email,
    })
    clearStates()
    history.push({ pathname: '/home' })
  }

  return (
    <form className='signupForm' onSubmit={onSubmit}>
      <div className='mainContainer'>
        <label htmlFor='username'>Username</label>
        <input
          type='username'
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
      </div>
      <div className='secondaryContainer'>
        <div className='nameGroup'>
          <div className='fname'>
            <label htmlFor='fname'>First Name</label>
            <input
              type='text'
              name='fname'
              id='fname'
              onChange={handleChange(setFirstName)}
              value={firstName}
            />
          </div>
          <div className='lname'>
            <label htmlFor='lname'>Last Name</label>
            <input
              type='text'
              name='lname'
              id='lname'
              onChange={handleChange(setLastName)}
              value={lastName}
            />
          </div>
        </div>
        <label htmlFor='email'>Email</label>
        <input
          type='text'
          name='email'
          id='email'
          onChange={handleChange(setEmail)}
          value={email}
        />
      </div>
      <button className='btn' type='submit'>
        Register
      </button>
    </form>
  )
}

export default SignUpForm
