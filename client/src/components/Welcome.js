import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import './styles/Welcome.css'

const Welcome = () => {
  let history = useHistory()
  let [location, setLocation] = useState('')

  const go = (e) => {
    e.preventDefault()
    history.push({ pathname: `/${location}` })
  }

  return (
    <div className='welcomeContainer'>
      <div className='routes'>
        <h2>Welcome</h2>
        <form onSubmit={go}>
          <button
            type='submit'
            onClick={() => {
              setLocation('signup')
            }}
          >
            Sign Up
          </button>
          <button
            type='submit'
            onClick={() => {
              setLocation('login')
            }}
          >
            Log In
          </button>
        </form>
      </div>
    </div>
  )
}

export default Welcome
