import React from 'react'
import { authUser } from '../features/User/userSlice'
import { useSelector } from 'react-redux'

import '../styles/Messages.scss'

const PatientInfo = ({ name, message, datum, desc }) => {
  const user = useSelector(authUser)

  return (
    <div
      //className='messages'
      className={`messages ${name === user.displayName && 'messages-sender'}`}
    >
      <h4>{desc}</h4>
      <div className='messages-info'>
        <p className='name'>{name}</p>
        <p className='messages-msg'>{message}</p>
        <p className='messages-datum'>{datum}</p>
      </div>
    </div>
  )
}

export default PatientInfo
