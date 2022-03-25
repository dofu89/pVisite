import React, { useEffect, useState } from 'react'
import '../styles/Login.scss'
import { auth } from '../firebase'
import { useDispatch, useSelector } from 'react-redux'
import { authUser, setUser } from '../features/User/userSlice'
import { Button, TextField } from '@mui/material'
import Stunden from './Stunden'
import aos from 'aos'
import 'aos/dist/aos.css'

const NavBar = () => {
  const dispatch = useDispatch()
  const user = useSelector(authUser)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  useEffect(() => {
    aos.init({
      duration: 2000,
    })
  }, [])

  const login = (e) => {
    e.preventDefault()
    auth
      .signInWithEmailAndPassword(`${email}@visite.de`, password)
      .then((auth) => {
        if (auth.credential) {
          const token = auth.credential.accessToken
          console.log(token)
          //localStorage.setItem('token', token)
        }
        dispatch(setUser({ user: auth.user }))
        setEmail('')
        setPassword('')
      })
  }

  const logout = (e) => {
    e.preventDefault()
    auth.signOut(auth).then(dispatch(setUser({ user: null })))
  }

  return (
    <div data-aos='fade-in' className='login'>
      <div className='login-main'>
        <h3>{user ? 'Logout' : 'Login'}</h3>
        <form>
          {!user ? (
            <>
              <div>
                <TextField
                  label='Benutzername'
                  variant='outlined'
                  type='text'
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div>
                <TextField
                  label='Passwort'
                  variant='outlined'
                  type='password'
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  style={{ focusColor: 'yellow !important' }}
                />
              </div>
            </>
          ) : (
            <div className='stunden'>
              <Stunden />
            </div>
          )}

          {user ? (
            <Button variant='contained' onClick={logout}>
              Logout
            </Button>
          ) : (
            <Button variant='contained' onClick={login} type='submit'>
              Login
            </Button>
          )}
        </form>
      </div>
    </div>
  )
}

export default NavBar
