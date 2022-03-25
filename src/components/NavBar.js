import React, { useState } from 'react'
import '../styles/NavBar.scss'
import { Link } from 'react-router-dom'
import { Button } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { activeNavMenu, authUser, setActive } from '../features/User/userSlice'

const NavBar = () => {
  const user = useSelector(authUser)
  const dispatch = useDispatch()
  const active = useSelector(activeNavMenu)

  return (
    <div className='navbar'>
      <Button
        className={active === 'login' && 'active'}
        onClick={() => dispatch(setActive({ navMenu: 'login' }))}
      >
        <Link to={'login'}>{user ? 'Logout' : 'Login'}</Link>
      </Button>
      {user && (
        <Button
          className={active === 'berichte' && 'active'}
          onClick={() => dispatch(setActive({ navMenu: 'berichte' }))}
        >
          <Link to={'berichte'}>Tagesberichte</Link>
        </Button>
      )}
      {user && (
        <Button
          className={active === 'hinweise' && 'active'}
          onClick={() => dispatch(setActive({ navMenu: 'hinweise' }))}
        >
          <Link to={'hinweise'}>Hinweise</Link>
        </Button>
      )}
      {user?.photoURL === 'admin' && (
        <Button
          className={active === 'admin' && 'active'}
          onClick={() => dispatch(setActive({ navMenu: 'admin' }))}
        >
          <Link to={'admin'}>Admin</Link>
        </Button>
      )}
    </div>
  )
}

export default NavBar
