import React, { createContext, useReducer } from 'react'

export const UserContext = createContext()

const CREATE_USER = 'CREATE_USER'

const userReducer = (state, action) => {
  switch (action.type) {
    case CREATE_USER:
      const { username, password, firstName, lastName, email } = action.payload
      localStorage.setItem('username', username)
      localStorage.setItem('password', password)
      localStorage.setItem('firstName', firstName)
      localStorage.setItem('lastName', lastName)
      localStorage.setItem('email', email)
      return {
        ...action.payload,
      }
    default:
      return state
  }
}

const initState = {
  username: localStorage.getItem('username') || '',
  password: localStorage.getItem('password') || '',
  firstName: localStorage.getItem('firstName') || '',
  lastName: localStorage.getItem('lastName') || '',
  email: localStorage.getItem('email') || '',
}

const UserContextProvider = (props) => {
  const [user, dispatch] = useReducer(userReducer, initState)

  const createUser = (userInput) => {
    dispatch({ type: CREATE_USER, payload: userInput })
  }

  const getPrimaryInfo = () => {
    const { firstName, lastName, email } = user
    return { firstName, lastName, email }
  }

  return (
    <UserContext.Provider
      value={{ user, dispatch, createUser, getPrimaryInfo }}
    >
      {props.children}
    </UserContext.Provider>
  )
}

export default UserContextProvider
