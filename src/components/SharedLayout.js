import React from 'react'
import { Outlet } from 'react-router'
import Hero from './Hero'
import NavBar from './NavBar'

const SharedLayout = () => {
  return (
    <>
      <Hero />
      <NavBar />
      <Outlet />
    </>
  )
}

export default SharedLayout
