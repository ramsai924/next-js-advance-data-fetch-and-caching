import React from 'react'
import './styles.css'
import DeleteIcon from '../../UI/DeleteIcon'

function Message({ message, onDeleteMessage }: any) {
  return (
    <div className='message'>
        <div className='message__header'>
          <p className='message__user'>{message.userName}</p>
          <form action={onDeleteMessage.bind(null, message._id)}>
            <DeleteIcon messageId={message?._id} />
          </form>
        </div>
        <p className='message__content'>{message.message}</p>
        <p suppressHydrationWarning className='message__date'>{new Date(message.date).toDateString() + '  -  ' + new Date(message.date).toLocaleTimeString()}</p>
    </div>
  )
}

export default Message