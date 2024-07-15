"use server"

import { deleteUserMessage, getMessages, sendUserMessage } from "@/services/messages";
import { revalidatePath, revalidateTag } from "next/cache";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const randomNames = [
  "Oliver Smith",
  "Emma Johnson",
  "Liam Williams",
  "Ava Brown",
  "Sophia Jones",
  "Mason Garcia",
  "Isabella Martinez",
  "Mia Rodriguez",
  "Ethan Hernandez",
  "Charlotte Lopez",
  "James Gonzalez",
  "Amelia Wilson",
  "Benjamin Anderson",
  "Lucas Thomas",
  "Henry Moore",
  "Alexander Lee",
  "Ella Perez",
  "Harper Clark",
  "Jackson Lewis",
  "Grace Walker",
  "Daniel Hall",
  "Aiden Allen",
  "Sebastian Young",
  "Michael King",
  "Matthew Wright",
  "Samuel Scott",
  "David Green",
  "Joseph Adams",
  "Owen Baker",
  "Gabriel Nelson"
];

export const getMessagesList = async () => {
  try {
    const token = cookies().get('user_session')?.value || ''
    if(!token){
      redirect('/login')
    }
  return await getMessages(token)
  } catch (error) {
    throw error
  }
}

export const sendMessage = async (prevState: any, formData: any) => {
   try {
     const message = formData.get('message')

    if(message === ''){
      return {
        error: 'Please Provide Message'
      }
    }

    if(message.length < 5){
      return {
        error: 'Please Provide Message more than 5 characters'
      }
    }

    const messageObj = {
        userName: randomNames[Math.floor(Math.random() * randomNames.length)],
        message: message,
        date: new Date().toISOString()
    }

    const token = cookies().get('user_session')?.value || ''
    if(!token){
       return { error: 'Unauthorized', redirectTo: '/login' };
    }
    const response = await sendUserMessage(messageObj, token)
    console.log('first', response)
    if (response.message === 'Unauthorized') {
      return { error: 'Unauthorized', redirectTo: '/login' };
    }
    revalidateTag('get-messages')
    // redirect('/messages')
    return {
      error: 'Success'
    }
   } catch (error) {
    return {
      error: ''
    }
   }
}

export const deleteMessage = async (messageId: any) => {
    await deleteUserMessage(messageId)
    revalidateTag('get-messages')
}