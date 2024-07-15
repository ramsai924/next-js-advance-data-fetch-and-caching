"use client"
import React from 'react'
import './styles.css'
import { useFormStatus } from 'react-dom'

function DeleteIcon({ messageId }: any) {
    const formStatus = useFormStatus()
  return (
    <button name='messageId' value={messageId} className='delete-icon' disabled={formStatus.pending}>
        Delete
    </button>
  )
}

export default DeleteIcon