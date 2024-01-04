import { WifiOff } from "lucide-react";
import { Loader } from "lucide-react";
interface LoadingVideoProps {
    label: string
}

import React from 'react'

const LoadingVideo = ({label}: LoadingVideoProps) => {
  return (
    <div
     className="h-full flex flex-col space-y-4 justify-center items-center"
    >
      <Loader className="w-10 h-10 text-muted-foreground animate-spin" />
      <p className="text-muted-foreground capitalize">
            {label}
      </p>
    </div>
  )
}

export default LoadingVideo
