import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import SignUpForm from './components/SignUpForm'
import LoginForm from './components/LoginForm'
import Welcome from './components/Welcome'
import Home from './components/Home'
import UserContextProvider from './store/userContext'
import './App.css'

function App() {
  return (
    <UserContextProvider>
      <BrowserRouter>
        <div className='App'>
          <h1>AWS EC2 Homework 1</h1>
          <Switch>
            <Route exact path='/'>
              <Welcome />
            </Route>
            <Route path='/signup'>
              <SignUpForm />
            </Route>
            <Route path='/login'>
              <LoginForm />
            </Route>
            <Route path='/home'>
              <Home />
            </Route>
          </Switch>
        </div>
      </BrowserRouter>
    </UserContextProvider>
  )
}

export default App
