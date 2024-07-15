"use client"
import { useOptimistic } from 'react'
import Message from './Message'
import './styles.css'
import { deleteMessage } from '@/actions/messages'

function MessagesList({ messages }: any) {
    const [optimiseMessages, updateMessages] = useOptimistic(messages, (prevStateMessage: any, action: any) => {
        switch(action.type){
            case 'DELETE':
                return action.filteredMessages
            default:
                return prevStateMessage
        }
    })

    const onDeleteMessage = async (messageId: any) => {
        updateMessages({ type: 'DELETE', filteredMessages: optimiseMessages.filter((mess: any) => `${mess._id}` !== `${messageId}`) })
        await deleteMessage(messageId)
    }


  return (
     <div className={'messages__list'}>
          {
            optimiseMessages.length > 0 ? (
              <>
                {optimiseMessages.map((message: any) => <Message key={message?._id} message={message} onDeleteMessage={onDeleteMessage} />)}
              </>
            ) : (
              <p>No messages</p>
            )
          }
        </div>
  )
}

export default MessagesList