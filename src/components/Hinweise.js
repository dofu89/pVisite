import React, { useState, useEffect } from 'react'
import '../styles/Hinweise.scss'
import { db } from '../firebase'
import { useSelector } from 'react-redux'
import { authUser } from '../features/User/userSlice'
import firebase from 'firebase/compat/app'
import { Temporal } from '@js-temporal/polyfill'
import { Button } from '@mui/material'
import SendIcon from '@mui/icons-material/Send'
import Messages from './Messages'
import aos from 'aos'
import 'aos/dist/aos.css'

const Hinweise = () => {
  const dateAndTime = `${Temporal.Now.plainDateTimeISO().day.toString()}.${Temporal.Now.plainDateTimeISO().month.toString()}.${Temporal.Now.plainDateTimeISO().year.toString()} - ${Temporal.Now.plainDateTimeISO().hour.toString()}:${Temporal.Now.plainDateTimeISO().minute.toString()}`
  const [users, setUsers] = useState([])
  const [id, setId] = useState('')
  const [message, setMessage] = useState('')
  const user = useSelector(authUser)
  const [chat, setChat] = useState([])
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
      .collection('users')
      .onSnapshot((snapshot) => {
        setUsers(snapshot.docs.map((doc) => doc.data()))
      })
  }, [])

  useEffect(() => {
    db.collection('buch')
      .doc('5AVtPBqxsxKCGTxU2S7F')
      .collection('users')
      .doc(user?.uid)
      .collection('chat')
      .orderBy('timestamp', 'desc')
      .onSnapshot((snapshot) => setChat(snapshot.docs.map((doc) => doc.data())))
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  const sendMessage = (e) => {
    e.preventDefault()
    db.collection('buch')
      .doc('5AVtPBqxsxKCGTxU2S7F')
      .collection('users')
      .doc(id)
      .collection('chat')
      .add({
        message: message,
        name: user?.displayName,
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        dateAndTime: dateAndTime,
      })
    setMessage('')
    alert('Message sent')
  }

  const handleChange = (e) => {
    setId(e.target.value)
  }

  const disabled = message.trim() === '' // || patient.trim() === ''

  //Get Current Posts
  const indexOfLastPost = currentPage * msgPerPage
  const indexOfFirstPost = indexOfLastPost - msgPerPage
  const currentPosts = chat.slice(indexOfFirstPost, indexOfLastPost)

  const showMoreMsgs = () => {
    setMsgPerPage(msgPerPage + 10)
  }

  return (
    <div data-aos='fade-in' className='hinweise'>
      Hinweise
      <div className='messages-body'>
        <div className='new-messages'>
          <div className='new-messages-header'>
            <h3>New Message</h3>
          </div>
          <div className='new-messages-input'>
            <form onSubmit={(e) => e.preventDefault()} id='new-msg'>
              <div style={{ position: 'relative' }}>
                <p>Select Mitarbeiter</p>
                <select
                  className='input'
                  style={{ position: 'relative' }}
                  onChange={handleChange}
                >
                  <option defaultValue={''}></option>
                  {users.map((user) => (
                    <option key={user.id} value={user.id}>
                      {user.name}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <p>Message</p>
                <input
                  className='textarea'
                  type='text'
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                ></input>
              </div>
            </form>
            <Button
              disabled={disabled}
              onClick={sendMessage}
              //type='submit'
              form='new-msg'
              endIcon={<SendIcon />}
            >
              Send
            </Button>
          </div>
        </div>
        <div className='hinweise-messages'>
          <div className='hinweise-header'>
            <h3>My Messages</h3>
          </div>
          {currentPosts.map((msg, index) => (
            <Messages
              key={index}
              name={msg.name}
              message={msg.message}
              datum={msg.dateAndTime}
              desc={msg.desc}
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

export default Hinweise
