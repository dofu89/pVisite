import React from 'react'

import '../styles/Messages.scss'

const PatientInfo = ({ name, message, datum }) => {
  return (
    <div className='messages'>
      <h4></h4>
      <div className='messages-info'>
        <p className='name'>{name}</p>
        <p className='messages-msg'>{message}</p>
        <p className='messages-datum'>{datum}</p>
      </div>
    </div>
  )
}

export default PatientInfo
