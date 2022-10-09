import React, { useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.scss'
import Login from './components/Login'
import Tagesberichte from './components/Tagesberichte'
import Hinweise from './components/Hinweise'
import { auth } from './firebase'
import { useDispatch, useSelector } from 'react-redux'
import { authUser, setUser } from './features/User/userSlice'
import Admin from './components/Admin'
import { createBrowserHistory } from 'history'
import AboutUs from './components/AboutUs'
import aos from 'aos'
import 'aos/dist/aos.css'
import SharedLayout from './components/SharedLayout'

function App() {
  const dispatch = useDispatch()
  const user = useSelector(authUser)
  let history = createBrowserHistory()

  useEffect(() => {
    aos.init({
      duration: 2000,
    })
  }, [])

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      dispatch(setUser({ user: user }))
    })
  }, [])
  history.push('/')
  return (
    <div data-aos='fade-in' className='app'>
      <div className='app-main'>
        <Router>
          <Routes>
            <Route path='/' element={<SharedLayout />}>
              <Route index element={<AboutUs />} />
              <Route path='login' element={<Login />} />
              <Route path='berichte' element={<Tagesberichte />} />
              <Route path='hinweise' element={<Hinweise />} />
              <Route path='admin' element={<Admin />} />
              <Route path='*' element={<AboutUs />} />
            </Route>
          </Routes>
        </Router>
        {/*<Routes>
            <Route path='*' element={<Hero />} />
          </Routes>
          <Routes>
            <Route path='*' element={<NavBar />}></Route>
          </Routes>
          <Routes>
            <Route path='login' element={<Login />} />
            {user && <Route path='berichte' element={<Tagesberichte />} />}
            {user && <Route path='hinweise' element={<Hinweise />} />}
            {user?.photoURL === 'admin' && (
              <Route path='admin' element={<Admin />} />
            )}
          </Routes>
          <Routes>
            <Route index exact element={<AboutUs />} />
            </Routes>*/}
      </div>
    </div>
  )
}

export default App
