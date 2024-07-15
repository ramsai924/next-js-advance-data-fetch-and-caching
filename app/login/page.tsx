"use client"
// import FormButtons from '@/components/Form/Buttons'
// import React from 'react'
// import classes from './login.module.css'
// import Link from 'next/link'
// import { loginUser } from '@/actions/authentication'
// import { useFormState } from 'react-dom'

// function Login() {
//   const [formState, formAction] = useFormState(loginUser, {
//     errors: []
//   })
//   return (
//     <form className={classes.loginContainer} action={formAction}>
//       <div className={classes.loginContainer__field}>
//         <label htmlFor="email">Email</label>
//         <input name='email' type='text' placeholder='Enter an Email'/>
//       </div>
//       <div className={classes.loginContainer__field}>
//         <label htmlFor="password">Password</label>
//         <input name='password' type='password' placeholder='Enter an Password'/>
//       </div>
//       <div className={classes.loginContainer__field}>
//         <ul>
//           {
//             formState?.errors.map((err) => <li style={{color: 'red'}} key={err}>{err}</li>)
//           }
//         </ul>
//         <p>Haven't create account ? <Link href={'/register'}>Register</Link></p>
//         <FormButtons buttonText="Login" loaderText="Logging In" />
//       </div>
//     </form>
//   )
// }

// export default Login

import React, { useActionState } from "react"
import { loginUser } from '@/actions/authentication'
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import FormButtons from "@/components/Form/Buttons"
import { useFormState } from "react-dom"
import Link from "next/link"


function Login() {
   const [formState, formAction] = useFormState(loginUser, {
    errors: []
  })
  return (
   <div className="flex items-center justify-center h-screen w-screen">
    <form action={formAction}>
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle>Sign In</CardTitle>
        </CardHeader>
        <CardContent>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="email">Email</Label>
                <Input id="email" name="email" placeholder="Enter Email" />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="password">Password</Label>
                  <Input id="password" name="password" type="password" placeholder="Enter password" />
              </div>
            </div>
        </CardContent>
        <CardFooter className="flex flex-col justify-start">
          <CardDescription className="self-start">Not Have an Account ? <Link className="underline" href={'/register'}>Register</Link></CardDescription>
          <div className="self-end pt-4">
            <FormButtons buttonText="Login" loaderText="Signing In" />
          </div>
        </CardFooter>
      </Card>
    </form>
   </div>
  )
}

export default Login
