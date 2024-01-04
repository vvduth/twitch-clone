import { WifiOff } from "lucide-react";

interface OfflineVideoProps {
    username: string
}

import React from 'react'

const OfflineVideo = ({username}: OfflineVideoProps) => {
  return (
    <div
     className="h-full flex flex-col space-y-4 justify-center items-center"
    >
      <WifiOff className="w-10 h-10 text-muted-foreground" />
      <p className="text-muted-foreground">
        <span>
            {username} is offline
        </span>
      </p>
    </div>
  )
}

export default OfflineVideo
