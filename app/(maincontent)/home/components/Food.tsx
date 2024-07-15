'use client'
import { Button } from '@/components/ui/button'
import { useFoodStore } from '@/utils/zustandStore/food'
import React, { useEffect } from 'react'

function Food() {
    const { food, setFood, removeFood } = useFoodStore((state: any) => state)

  return (
    <div>
        <p>Food = {food}</p>
        <Button onClick={setFood}>Add Food</Button>
        <Button onClick={removeFood}>Remove Food</Button>
    </div>
  )
}

export default Food