import React, { useEffect } from 'react'
import '../styles/AboutUs.scss'
import aos from 'aos'
import 'aos/dist/aos.css'

const AboutUs = () => {
  useEffect(() => {
    aos.init({
      duration: 2000,
    })
  }, [])

  return (
    <div data-aos='fade-in' className='about'>
      AboutUs
    </div>
  )
}

export default AboutUs
