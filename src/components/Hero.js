import React from 'react'
import '../styles/Hero.scss'
import logo from '../images/logo.png'
import { Link, Outlet } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { authUser, setActive } from '../features/User/userSlice'
import { Temporal } from '@js-temporal/polyfill'

const Hero = () => {
  const user = useSelector(authUser)
  const dateAndTime = `${Temporal.Now.plainDateTimeISO().day.toString()}.${Temporal.Now.plainDateTimeISO().month.toString()}.${Temporal.Now.plainDateTimeISO().year.toString()} - ${Temporal.Now.plainDateTimeISO().hour.toString()}:${Temporal.Now.plainDateTimeISO().minute.toString()}`
  const dispatch = useDispatch()

  return (
    <div className='hero'>
      <h1>{user && `${user.displayName} - ${dateAndTime}`}</h1>
      <Link to='/'>
        <img
          onClick={() => dispatch(setActive({ navMenu: '' }))}
          src={logo}
          alt='logo'
        />
      </Link>
    </div>
  )
}

export default Hero
