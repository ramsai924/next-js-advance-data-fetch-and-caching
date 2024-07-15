"use client"
import React from 'react'
import { useFormStatus } from 'react-dom'
import './styles.css'
import { Button } from '@/components/ui/button'

function FormButtons({ buttonText, loaderText }: any) {
    const formStatus = useFormStatus()
  return (
    <Button disabled={formStatus.pending}>{formStatus.pending ? loaderText : buttonText}</Button>
  )
}

export default FormButtons