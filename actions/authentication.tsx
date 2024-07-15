"use server"

import { loginUserService, registerUserService } from "@/services/authentication";
import { redirect } from "next/navigation"
import { cookies } from "next/headers";

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

export const loginUser = async (prevState: any, formData: FormData) => {
  try {
      const userInfo: any = {
        email: formData.get('email'),
        password: formData.get('password')
      }

      let errors = []
      if(userInfo && userInfo.password.length < 6){
        errors.push('Password must be greater than 6 chars')
      }
    if(userInfo && !userInfo.email.includes('@')){
        errors.push('Provide valid email')
      }

      if(errors.length > 0){
        return {
          errors
        }
      }
      const response = await loginUserService(userInfo)
      if(response.data){
        const expireTime = new Date(new Date().getTime() + 30 * 60 * 1000);
        cookies().set('user_session', response.data, { httpOnly: true, expires: expireTime })
        
      }else{
        return {
          errors: [response.message]
        }
      }
  } catch (error: any) {
    return {
    errors: Object.keys(error).map((er) => error[er])
  }
  }

   redirect('/home')
}

export const registerUser = async (prevState: any, formData: any) => {
 try {
    const userInfo = {
    email: formData.get('email'),
    password: formData.get('password'),
    confirmPassword: formData.get('confirmPassword'),
  }

  let errors = []

  if(userInfo.password.length < 6){
    errors.push('Password must be greater than 6 chars')
  }

  if(userInfo.password !== userInfo.confirmPassword){
    errors.push('Passwords not matched')
  }

  if(!userInfo.email.includes('@')){
    errors.push('Provide valid email')
  }

  if(errors.length > 0){
    return {
      errors: errors
    }
  }
  delete userInfo.confirmPassword

  if(userInfo?.password === undefined){
    return {
      errors: ['Password required']
    }
  }
  const response = await registerUserService(userInfo)
  if(response.data){
    const expireTime = new Date(new Date().getTime() + 30 * 60 * 1000);
    cookies().set('user_session', response.data, { httpOnly: true, expires: expireTime })
  }else{
    return {
      errors: ['Something went wrong']
    }
  }
 } catch (error: any) {
  return {
    errors: Object.keys(error).map((er) => error[er])
  }
 }

 redirect('/home')
}

