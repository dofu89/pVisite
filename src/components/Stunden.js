import React, { useEffect, useState } from 'react'
import { Temporal } from '@js-temporal/polyfill'
import { Button } from '@mui/material'
import { db } from '../firebase'
import firebase from 'firebase/compat/app'
import '../styles/Stunden.scss'
import { useSelector } from 'react-redux'
import { authUser } from '../features/User/userSlice'

import CircularProgress from '@mui/material/CircularProgress'
import Box from '@mui/material/Box'

const Stunden = ({ todayUserTime, localSaved, fetchingData }) => {
  const [start, setStart] = useState('START')
  const [stop, setStop] = useState('STOP')
  const [fetching, setFetching] = useState(true)
  const date = `${Temporal.Now.plainDateTimeISO().day.toString()}.${Temporal.Now.plainDateTimeISO().month.toString()}.${Temporal.Now.plainDateTimeISO().year.toString()}`
  const time = `${Temporal.Now.plainDateTimeISO().hour.toString()}:${Temporal.Now.plainDateTimeISO().minute.toString()}`
  const user = useSelector(authUser)

  useEffect(() => {
    const getStartTime = async () => {
      if (localSaved === todayUserTime) {
        await db
          .collection('buch')
          .doc('5AVtPBqxsxKCGTxU2S7F')
          .collection('users')
          .doc(user.uid)
          .collection('stunden')
          .doc('start')
          .get()
          .then(
            (val) => setStart(val.data().start),
            setTimeout(() => {
              setFetching(fetchingData)
            }, 500)
          )
      }
    }

    getStartTime()
  }, [localSaved])

  useEffect(() => {
    const getStopTime = async () => {
      if (localSaved === todayUserTime) {
        await db
          .collection('buch')
          .doc('5AVtPBqxsxKCGTxU2S7F')
          .collection('users')
          .doc(user.uid)
          .collection('stunden')
          .doc('stop')
          .get()
          .then(
            (val) => setStop(val.data().stop),
            setTimeout(() => {
              setFetching(fetchingData)
            }, 500)
          )
      }
    }

    getStopTime()
  }, [localSaved])

  setTimeout(() => {
    setFetching(false)
  }, 2000)

  const handleStart = () => {
    db.collection('buch')
      .doc('5AVtPBqxsxKCGTxU2S7F')
      .collection('users')
      .doc(user.uid)
      .collection('stunden')
      .doc('start')
      .set({
        start: time,
      })
    setStart(time)
  }

  const handleStop = () => {
    db.collection('buch')
      .doc('5AVtPBqxsxKCGTxU2S7F')
      .collection('users')
      .doc(user.uid)
      .collection('stunden')
      .doc('stop')
      .set({
        stop: time,
      })
    setStop(time)

    db.collection('buch')
      .doc('5AVtPBqxsxKCGTxU2S7F')
      .collection('users')
      .doc('eVqgo9eu5VhGKQUOajXcaw0Ouc83')
      .collection('chat')
      .add({
        desc: 'Stunden',
        message: `${start} - ${time}`,
        name: user?.displayName,
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        dateAndTime: date,
      })

    /*setTimeout(() => {
      db.collection('buch')
        .doc('5AVtPBqxsxKCGTxU2S7F')
        .collection('stunden')
        .doc('sati')
        .delete()
    }, 10000)*/
  }

  const checkStart = start !== 'START'
  const checkStop = stop !== 'STOP' || start === 'START'

  console.log('danas', localSaved)

  return (
    <div className='stunden'>
      {fetching ? (
        <Box sx={{ display: 'flex' }}>
          <CircularProgress />
        </Box>
      ) : (
        <>
          <Button disabled={checkStart} onClick={handleStart}>
            {start}
          </Button>
          <p>:</p>
          <Button disabled={checkStop} onClick={handleStop}>
            {stop}
          </Button>
        </>
      )}
    </div>
  )
}

export default Stunden
