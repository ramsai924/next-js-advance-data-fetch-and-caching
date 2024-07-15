"use client"
import React from 'react'
import classes from './register.module.css'
import FormButtons from '@/components/Form/Buttons'
import Link from 'next/link'
import { useFormState } from 'react-dom'
import { registerUser } from '@/actions/authentication'

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

// function Register() {
  // const [formState, formActions] = useFormState(registerUser, {
  //   errors: []
  // })


//   return (
//     <form className={classes.registerContainer} action={formActions}>
//       <div className={classes.registerContainer__field}>
//         <label htmlFor="email">Email</label>
//         <input name='email' type='text' placeholder='Enter an Email'/>
//       </div>
//       <div className={classes.registerContainer__field}>
//         <label htmlFor="password">Password</label>
//         <input name='password' type='password' placeholder='Enter an Password'/>
//       </div>
//        <div className={classes.registerContainer__field}>
//         <label htmlFor="confirmPassword">Confirm Password</label>
//         <input name='confirmPassword' type='password' placeholder='confirm Password'/>
//       </div>
//       <div className={classes.registerContainer__field}>
//         <ul>
//           {
//             formState?.errors.map((err) => <li style={{color: 'red'}} key={err}>{err}</li>)
//           }
//         </ul>
//         <p>Already have an account ? <Link href={'/login'}>Login</Link></p>
//         <FormButtons buttonText="Register" loaderText="Registering..." />
//       </div>
//     </form>
//   )
// }

// export default Register


function Register(){
  const [formState, formAction] = useFormState(registerUser, {
    errors: []
  })
  return(
     <div className="flex items-center justify-center h-screen w-screen">
    <form action={formAction}>
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle>Sign Up</CardTitle>
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
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="confirmPassword">Confirm Password</Label>
                <Input id="confirmPassword" name="confirmPassword" type="password" placeholder="Enter confirm password" />
              </div>
            </div>
        </CardContent>
        <CardFooter className="flex flex-col justify-start">
          <CardDescription className="self-start">Already Have an Account ? <Link className="underline" href={'/login'}>Login</Link></CardDescription>
          <div className="self-end pt-4">
            <FormButtons buttonText="Register" loaderText="Signing Up" />
          </div>
        </CardFooter>
      </Card>
    </form>
   </div>
  )
}

export default Register