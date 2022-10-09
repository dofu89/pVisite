import React, { useEffect } from 'react'
import '../styles/AboutUs.scss'
import aos from 'aos'
import 'aos/dist/aos.css'
import { Outlet } from 'react-router'
import Hero from './Hero'
import NavBar from './NavBar'

const AboutUs = () => {
  useEffect(() => {
    aos.init({
      duration: 2000,
    })
  }, [])

  return (
    <div data-aos='fade-in' className='about'>
      <div className='paragraph'>
        <p>
          Etwas uber uns Etwas uber uns Etwas uber uns Etwas uber uns Etwas uber
          uns Etwas uber uns Etwas uber uns Etwas uber uns Etwas uber uns Etwas
          uber uns Etwas uber uns Etwas uber uns Etwas uber uns Etwas uber uns
          Etwas uber uns Etwas uber uns Etwas uber uns Etwas uber uns Etwas uber
          uns Etwas uber uns Etwas uber uns Etwas uber uns
        </p>
      </div>
    </div>
  )
}

export default AboutUs
