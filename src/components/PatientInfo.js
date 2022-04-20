import React from 'react'
import '../styles/PatientInfo.scss'
import { authUser } from '../features/User/userSlice'
import { useSelector } from 'react-redux'

const PatientInfo = ({ name, message, datum, patient }) => {
  const user = useSelector(authUser)

  return (
    <div className={`patient ${name === user.displayName && 'patient-sender'}`}>
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
