import React from 'react'
import '../styles/NavBar.scss'
import { Link, NavLink } from 'react-router-dom'
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
        <NavLink to={'login'}>{user ? 'Logout' : 'Login'}</NavLink>
      </Button>
      {user && (
        <Button
          className={active === 'berichte' && 'active'}
          onClick={() => dispatch(setActive({ navMenu: 'berichte' }))}
        >
          <NavLink to={'berichte'}>Tagesberichte</NavLink>
        </Button>
      )}
      {user && (
        <Button
          className={active === 'hinweise' && 'active'}
          onClick={() => dispatch(setActive({ navMenu: 'hinweise' }))}
        >
          <NavLink to={'hinweise'}>Hinweise</NavLink>
        </Button>
      )}
      {user?.photoURL === 'admin' && (
        <Button
          className={active === 'admin' && 'active'}
          onClick={() => dispatch(setActive({ navMenu: 'admin' }))}
        >
          <NavLink to={'admin'}>Admin</NavLink>
        </Button>
      )}
    </div>
  )
}

export default NavBar
