import React from 'react'
import { Skeleton } from "@/components/ui/skeleton"
import classes from './messages.module.css'

function loading() {
  return (
    <div className={classes.messages}>
      <Skeleton className="w-[200px] h-[20px]" />
      {
        new Array(10).fill('').map((_: any, i: number) => <Skeleton key={i} className="w-[100%] h-[100px] m-[10px 0]" />)
      }
    </div>
  )
}

export default loading