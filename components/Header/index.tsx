import Link from 'next/link'
import React from 'react'
import { logoutUser } from '@/utils/authentication'
import { redirect } from 'next/navigation'
import './styles.css'
import { ModeToggle } from '../Theme/Handler'

function Header({ messagesCount }: any) {
  return (
    <div className='header'>
        <div className='header__logo'>
            <Link href={'/home'}>Home</Link>
        </div>
        <div className='header__navItems'>
            <div><Link href={'/messages'}>Messages {messagesCount ? `(${messagesCount})` : ''}</Link></div>
            <div><Link href={'/send-message'}>Send Message</Link></div>
            <form action={async () => {
              "use server"
              logoutUser()
              redirect('/')
            }}>
              <button className='cursor-pointer'>Logout</button>
            </form>
            <ModeToggle />
        </div>
    </div>
  )
}

export default Header