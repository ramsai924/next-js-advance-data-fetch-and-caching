'use client'
import React, { useEffect } from 'react'
import classes from './sendMessage.module.css'
import { sendMessage } from '@/actions/messages'
import FormButtons from '@/components/Form/Buttons'
import { useFormState } from 'react-dom'
import { useRouter } from 'next/navigation';
// function SendMessage() {
//   const [formState, formActions] = useFormState(sendMessage, {
//     error: ''
//   })

//   return (
//     <div className={classes.sendMessage}>
//       <form className={classes.sendMessageForm} action={formActions}>
//         <label className={classes.textAreaLabel} htmlFor='message'>Send Message : </label>
//         <textarea
//           className={classes.textArea}
//           name='message'
//           placeholder='Enter Message'
//         />
//         {
//           formState.error && <p className={classes.textAreaAlert}>{formState.error}</p>
//         }
//         <FormButtons />
//       </form>
//     </div>
//   )
// }

// export default SendMessage
import { useToast } from "@/components/ui/use-toast"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"

function SendMessage(){
  const router = useRouter()
  const { toast } = useToast()
  const [formState, formActions] = useFormState(sendMessage, {
    error: ''
  })
  useEffect(() => {
    if (formState.redirectTo) {
      return router.push(formState.redirectTo);
    }
    if (formState?.error === 'Success') {
       toast({
          title: "Message Sent Successfully",
          description: "Friday, February 10, 2023 at 5:57 PM",
          style: {
            background: 'lightgreen',
          }
        })
      return router.push('/messages');
    }
  }, [formState])
  return (
    <div className='flex items-center justify-center w-[100%] h-[80vh]'>
      <form className='min-w-3.5' action={formActions}>
        <Card className="w-[350px]">
          <CardHeader>
            <CardTitle>Send Message : </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col space-y-1.5">
                <Textarea name='message' placeholder="Type your message here." />
            </div>
          </CardContent>
          <CardFooter className="flex flex-col justify-start">
            <div className="self-end pt-4">
              <FormButtons buttonText="Send" loaderText="Sending" />
            </div>
          </CardFooter>
        </Card>
      </form>
    </div>
  )
}

export default SendMessage