'use client'
import { Button } from '@/components/ui/button'
import { useStore } from '@/utils/zustandStore/bears'
import { useFoodStore } from '@/utils/zustandStore/food'
import React, { useEffect, useState } from 'react'

function Bears() {
    const [bgColor, setBgColor] = useState('')
  const { bears, increasePopulation, removeBear } = useStore((state: any) => state)

  useEffect(() => {
        const unsub = useFoodStore.subscribe((state: any, prevState: any) => {
            if(state.food > 5){
                setBgColor('lightgreen')
            }else{
                setBgColor('lightpink')
            }
        })
        return unsub;
    }, [])

  return (
    <div style={{ background: `${bgColor}`, padding:10 }}>
        <p>Bears = {bears}</p>
        {Math.random()}
        <Button onClick={increasePopulation}>Add Bear</Button>
        <Button disabled={bears === 0} onClick={removeBear}>Remove Bear</Button>
    </div>
  )
}

export default Bears