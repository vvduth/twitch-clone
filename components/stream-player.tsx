import { User,Stream } from '@prisma/client'
import React from 'react'


interface StreamPlayerProps {
    user: User & {stream: Stream | null} ,
    stream: Stream ;
    isFollowing: boolean
}
const StreamPlayer = ({user, stream, isFollowing}:StreamPlayerProps) => {
  return (
    <div>
      
    </div>
  )
}

export default StreamPlayer
