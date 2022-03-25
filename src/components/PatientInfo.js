import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { messagesBase, setMessages } from '../features/User/userSlice'
import { db } from '../firebase'
import '../styles/PatientInfo.scss'

const PatientInfo = ({ name, message, datum, patient }) => {
  const dispatch = useDispatch()
  const messages = useSelector(messagesBase)

  useEffect(() => {}, [])

  return (
    <div className='patient'>
      <h4>{patient}</h4>
      <div className='patient-info'>
        <p className='name'>{name}</p>
        <p className='patient-msg'>{message}</p>
        <p className='patient-datum'>{datum}</p>
      </div>
    </div>
  )
}

export default PatientInfo
