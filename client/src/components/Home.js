import React, { useEffect, useContext, useState } from 'react'
import { useHistory } from 'react-router-dom'
import axios from 'axios'
import { UserContext } from '../store/userContext'
import './styles/Home.css'
import FileUpload from './FileUpload'

const Home = () => {
  const history = useHistory()
  const { user, logoutUser } = useContext(UserContext)
  const [fileUpload, setFileUpload] = useState(<></>)
  const [view, setView] = useState(<tr></tr>)
  useEffect(() => {
    axios
      .post('http://ec2-18-218-112-28.us-east-2.compute.amazonaws.com:5000/user/getUser', {
        searchProps: {
          username: user.username,
          password: user.password,
        },
      })
      .then((payload) => {
        userInfo(payload.data.user)
      })
      .catch((err) => console.error(err.message))
  }, [user])

  const logout = () => {
    logoutUser()
    history.push('/')
  }

  const userInfo = (info) => {
    setFileUpload(<FileUpload userId={info['_id']} />)
    const primaryInfo = {
      firstName: info.firstName,
      lastName: info.lastName,
      email: info.email,
    }
    setView(
      Object.entries(primaryInfo).map(([key, val]) => (
        <tr key={key}>
          <td className='key' style={{ textAlign: 'right' }}>
            {key}
          </td>
          <td>{val}</td>
        </tr>
      ))
    )
  }

  return (
    <div className='homeContainer'>
      <div className='dataTable'>
        <h2>Your Data</h2>
        <table>
          <tbody>{view}</tbody>
        </table>
        {fileUpload}
      </div>
      <button className='btn logoutBtn' onClick={logout}>
        Log Out
      </button>
    </div>
  )
}

export default Home
