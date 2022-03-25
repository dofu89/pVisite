import { Temporal } from '@js-temporal/polyfill'
import { Button } from '@mui/material'
import React, { useState } from 'react'
import { db } from '../firebase'
import firebase from 'firebase/compat/app'
import '../styles/Stunden.scss'

const Stunden = () => {
  const [start, setStart] = useState('START')
  const [stop, setStop] = useState('STOP')

  const time = `${Temporal.Now.plainDateTimeISO().hour.toString()}:${Temporal.Now.plainDateTimeISO().minute.toString()}`

  const handleStart = () => {
    /*db.collection('buch')
      .doc('5AVtPBqxsxKCGTxU2S7F')
      .collection('stunden')
      .add({
        start: time,
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      })*/
    setStart(time)
  }

  const handleStop = () => {
    /*db.collection('buch')
      .doc('5AVtPBqxsxKCGTxU2S7F')
      .collection('stunden')
      .add({
        stop: time,
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      })*/
    setStop(time)
  }

  const checkStart = start !== 'START'
  const checkStop = stop !== 'STOP'

  return (
    <div className='stunden'>
      <Button disabled={checkStart} onClick={handleStart}>
        {start}
      </Button>
      <p>:</p>
      <Button disabled={checkStop} onClick={handleStop}>
        {stop}
      </Button>
    </div>
  )
}

export default Stunden
