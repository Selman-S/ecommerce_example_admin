import React from 'react'
import { Button } from '../ui/button'
import { Trash } from 'lucide-react'

const Delete = () => {
  return (
    <Button className="bg-red-1 text-white">
      <Trash className="w-4 h-4"/>
    </Button>
  )
}

export default Delete
