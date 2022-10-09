import React, { useEffect, useState } from 'react'
import '../styles/Login.scss'
import { auth, db } from '../firebase'
import { useDispatch, useSelector } from 'react-redux'
import { authUser, setUser } from '../features/User/userSlice'
import { Button, TextField } from '@mui/material'
import Stunden from './Stunden'
import aos from 'aos'
import 'aos/dist/aos.css'
import { Temporal } from '@js-temporal/polyfill'
import firebase from 'firebase/compat/app'
import { useNavigate } from 'react-router-dom'

import CircularProgress from '@mui/material/CircularProgress'
import Box from '@mui/material/Box'

const NavBar = () => {
  const dispatch = useDispatch()
  const user = useSelector(authUser)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [todayUser] = useState(Temporal.Now.plainDateISO().toString())
  const [fetching, setFetching] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    aos.init({
      duration: 2000,
    })
  }, [])

  useEffect(() => {
    const getDateFromDB = async () => {
      await db
        .collection('buch')
        .doc('5AVtPBqxsxKCGTxU2S7F')
        .collection('users')
        .doc(user?.uid)
        .collection('stunden')
        .doc('today')
        .get()
        .then((val) => localStorage.setItem('today', val.data().today))

      if (localStorage.getItem('today') === todayUser) {
        setFetching(false)
      }
    }

    getDateFromDB()
  }, [])

  function login(e) {
    e.preventDefault()
    auth
      .setPersistence(firebase.auth.Auth.Persistence.SESSION)
      .then(() => {
        return auth.signInWithEmailAndPassword(`${email}@visite.de`, password)
      })
      .then(async (auth) => {
        await db
          .collection('buch')
          .doc('5AVtPBqxsxKCGTxU2S7F')
          .collection('users')
          .doc(auth.user.uid)
          .collection('stunden')
          .doc('today')
          .get()
          .then((val) => localStorage.setItem('today', val.data().today))

        const loggedUser = auth.user
        dispatch(setUser({ user: loggedUser }))
        setEmail('')
        setPassword('')

        return loggedUser
      })
      .then(async (loggedUser) => {
        if (localStorage.getItem('today') !== todayUser) {
          localStorage.setItem('today', todayUser)
          await db
            .collection('buch')
            .doc('5AVtPBqxsxKCGTxU2S7F')
            .collection('users')
            .doc(loggedUser?.uid)
            .collection('stunden')
            .doc('start')
            .set({
              start: 'START',
            })

          await db
            .collection('buch')
            .doc('5AVtPBqxsxKCGTxU2S7F')
            .collection('users')
            .doc(loggedUser?.uid)
            .collection('stunden')
            .doc('stop')
            .set({
              stop: 'STOP',
            })

          await db
            .collection('buch')
            .doc('5AVtPBqxsxKCGTxU2S7F')
            .collection('users')
            .doc(loggedUser?.uid)
            .collection('stunden')
            .doc('today')
            .set({
              today: todayUser,
            })
          setFetching(false)
        }
      })
      .catch((err) => console.log('Error: ', err))
    setTimeout(() => {
      setFetching(false)
    }, 500)
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
              {fetching ? (
                <Box sx={{ display: 'flex' }}>
                  <CircularProgress />
                </Box>
              ) : (
                <Stunden
                  todayUserTime={todayUser}
                  localSaved={localStorage.getItem('today')}
                  fetchingData={fetching}
                />
              )}
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
