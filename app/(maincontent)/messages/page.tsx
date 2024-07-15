import Message from '@/components/Messages/Message'
import React from 'react'
import classes from './messages.module.css'
import MessagesList from '@/components/Messages'
import { getMessagesList } from '@/actions/messages'

async function Messages() {
  const messages = await getMessagesList()
  return (
    <div className={classes.messages}>
        <div className={classes.messages__header}>
            <p className={classes.messages__headerTitle}>Messages List</p>
            <hr />
        </div>
       <MessagesList messages={messages || []} />
    </div>
  )
}

export default Messages