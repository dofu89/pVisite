import React, { useState, useEffect } from 'react'
import { db } from '../firebase'
import '../styles/Tagesberichte.scss'
import PatientInfo from './PatientInfo'
import firebase from 'firebase/compat/app'
import { authUser, messagesBase, setMessages } from '../features/User/userSlice'
import { useDispatch, useSelector } from 'react-redux'
import { Temporal } from '@js-temporal/polyfill'
import { Button } from '@mui/material'
import SendIcon from '@mui/icons-material/Send'
import aos from 'aos'
import 'aos/dist/aos.css'

const Tagesberichte = () => {
  const dateAndTime = `${Temporal.Now.plainDateTimeISO().day.toString()}.${Temporal.Now.plainDateTimeISO().month.toString()}.${Temporal.Now.plainDateTimeISO().year.toString()} - ${Temporal.Now.plainDateTimeISO().hour.toString()}:${Temporal.Now.plainDateTimeISO().minute.toString()}`
  const dispatch = useDispatch()
  const user = useSelector(authUser)
  const messages = useSelector(messagesBase)
  const [bemerkung, setBemerkung] = useState('')
  const [patienten, setPatienten] = useState([])
  const [patient, setPatient] = useState('')
  const [suggestions, setSuggestions] = useState([])
  const [currentPage] = useState(1)
  const [msgPerPage, setMsgPerPage] = useState(10)

  useEffect(() => {
    aos.init({
      duration: 2000,
    })
  }, [])

  useEffect(() => {
    db.collection('buch')
      .doc('5AVtPBqxsxKCGTxU2S7F')
      .collection('messages')
      .orderBy('timestamp', 'desc')
      .onSnapshot((snapshot) => {
        dispatch(
          setMessages({ messages: snapshot.docs.map((doc) => doc.data()) })
        )
      })
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    db.collection('buch')
      .doc('5AVtPBqxsxKCGTxU2S7F')
      .collection('patienten')
      .orderBy('timestamp', 'desc')
      .onSnapshot((snapshot) =>
        setPatienten(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            data: doc.data(),
          }))
        )
      )
  }, [])

  const sendMessage = (e) => {
    e.preventDefault()
    db.collection('buch')
      .doc('5AVtPBqxsxKCGTxU2S7F')
      .collection('messages')
      .add({
        message: bemerkung,
        name: user?.displayName,
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        dateAndTime: dateAndTime,
        patient: patient,
      })
    setBemerkung('')
    setPatient('')
  }

  const patNamen = patienten.map((patient) => patient.data)

  const onChangeHandler = (patient) => {
    let matches = []
    if (patient.length > 1) {
      matches = patNamen.filter((pat) => {
        const regex = new RegExp(`${patient}`, 'gi')
        return pat.name.match(regex)
      })
    }
    setSuggestions(matches)
    setPatient(patient)
  }

  const disabled = bemerkung.trim() === '' || patient.trim() === ''

  //Get Current Posts
  const indexOfLastPost = currentPage * msgPerPage
  const indexOfFirstPost = indexOfLastPost - msgPerPage
  const currentPosts = messages.slice(indexOfFirstPost, indexOfLastPost)

  const showMoreMsgs = () => {
    setMsgPerPage(msgPerPage + 10)
  }

  return (
    <div data-aos='fade-in' className='tagesberichte'>
      Tagesberichte
      <div className='tagesberichte-body'>
        <div className='new-info'>
          <div className='new-info-header'>
            <h3>Neuer Eintrag</h3>
          </div>
          <div className='new-info-input'>
            <form id='new-info'>
              <div style={{ position: 'relative' }}>
                <p>Patient</p>
                <datalist id='patienten-list'>
                  {suggestions.map((suggestion, index) => (
                    <option
                      key={index}
                      value={`${suggestion.name} ${suggestion.firstName}`}
                    />
                  ))}
                </datalist>
                <input
                  className='input'
                  style={{ position: 'relative' }}
                  type='search'
                  value={patient}
                  onChange={(e) => onChangeHandler(e.target.value)}
                  required
                  list='patienten-list'
                ></input>
                {/*<div className='suggestions'>
                  {suggestions &&
                    suggestions.map((suggestion, index) => (
                      <div
                        onClick={(e) => pickPatient(e)}
                        className='suggestions-list'
                        key={index}
                      >{`${suggestion.name} ${suggestion.firstName}`}</div>
                    ))}
                    </div>*/}
              </div>
              <div>
                <p>Bemerkung</p>
                <input
                  className='textarea'
                  type='text'
                  value={bemerkung}
                  onChange={(e) => setBemerkung(e.target.value)}
                  required
                ></input>
              </div>
            </form>
            <Button
              disabled={disabled}
              onClick={sendMessage}
              //type='submit'
              form='new-info'
              endIcon={<SendIcon />}
            >
              Send
            </Button>
          </div>
        </div>
        <div className='all-info'>
          <div className='all-info-header'>
            <h3>Alle Info</h3>
          </div>
          {currentPosts.map((message, index) => (
            <PatientInfo
              key={index}
              name={message.name}
              message={message.message}
              datum={message.dateAndTime}
              patient={message.patient}
            />
          ))}
          <Button
            style={{ color: 'hsl(337, 100%, 40%)' }}
            onClick={showMoreMsgs}
          >
            Load More
          </Button>
        </div>
      </div>
    </div>
  )
}

export default Tagesberichte
