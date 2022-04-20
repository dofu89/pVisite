import { Button } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { auth, db } from '../firebase'
import firebase from 'firebase/compat/app'
import '../styles/Admin.scss'
import { useDispatch } from 'react-redux'
import { setUserId } from '../features/User/userSlice'
import aos from 'aos'
import 'aos/dist/aos.css'
import { Temporal } from '@js-temporal/polyfill'

const Admin = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [patientName, setpatientName] = useState('')
  const [patientVorname, setpatientVorname] = useState('')
  const [admin, setAdmin] = useState(false)
  const dispatch = useDispatch()
  const [todayUser] = useState(Temporal.Now.plainDateISO().toString())

  useEffect(() => {
    aos.init({
      duration: 2000,
    })
  }, [])

  const register = (e) => {
    e.preventDefault()
    auth
      .createUserWithEmailAndPassword(`${email}@visite.de`, password)
      .then((auth) => {
        if (auth) {
          auth.user.updateProfile({
            displayName: name,
            photoURL: admin ? 'admin' : null,
          })
          db.collection('buch')
            .doc('5AVtPBqxsxKCGTxU2S7F')
            .collection('users')
            .doc(auth.user.uid)
            .collection('stunden')
            .doc('today')
            .set({
              today: todayUser,
            })
          setName('')
          setEmail('')
          setPassword('')
        }
        dispatch(setUserId({ userId: auth.user.uid }))

        db.collection('buch')
          .doc('5AVtPBqxsxKCGTxU2S7F')
          .collection('users')
          .doc(auth.user.uid)
          .set({
            name: name,
            id: auth.user.uid,
          })
      })
      .catch((err) => console.log(err))
  }

  //console.log('state user id', userId)

  const addPatient = (e) => {
    e.preventDefault()
    db.collection('buch')
      .doc('5AVtPBqxsxKCGTxU2S7F')
      .collection('patienten')
      .add({
        name: patientName,
        firstName: patientVorname,
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      })
    setpatientName('')
    setpatientVorname('')
    alert('Neu atient added')
  }

  return (
    <div data-aos='fade-in' className='admin'>
      <div className='login-main'>
        <h3>Add neu Mitarbeiter</h3>
        <form>
          <div>
            <p>Name</p>
            <input
              type='text'
              value={name}
              onChange={(e) => setName(e.target.value)}
            ></input>
          </div>
          <div>
            <p>Benutzername</p>
            <input
              type='text'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            ></input>
          </div>
          <div>
            <p>Passwort</p>
            <input
              type='password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            ></input>
          </div>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              width: 80,
            }}
          >
            <p>Admin</p>
            <input
              type='checkbox'
              defaultChecked={false}
              onChange={() => setAdmin(!admin)}
            />
          </div>
          <Button onClick={register}>Add</Button>
        </form>
      </div>
      <div className='login-main'>
        <h3>Add neu Patient</h3>
        <form>
          <div>
            <p>Name</p>
            <input
              type='text'
              value={patientName}
              onChange={(e) => setpatientName(e.target.value)}
            ></input>
          </div>
          <div>
            <p>Vorname</p>
            <input
              type='text'
              value={patientVorname}
              onChange={(e) => setpatientVorname(e.target.value)}
            ></input>
          </div>
          <Button onClick={addPatient}>Add</Button>
        </form>
      </div>
    </div>
  )
}

export default Admin
