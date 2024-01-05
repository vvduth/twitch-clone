import { useMemo } from "react";
import { Hint } from "../hint";
import { Info } from "lucide-react";

import React from 'react'
interface ChatInfoProps {
    isDelayed: boolean,
    isFollowersOnly: boolean
}



const ChatInfo = ({isDelayed, isFollowersOnly}:ChatInfoProps) => {

    const hint = useMemo(() => {
        if (isFollowersOnly && !isDelayed) {
                return "Only followers can chat"
        } else if (isDelayed && !isFollowersOnly) {
            return "Messages are delayed for 3 seconds"
        } else if (isDelayed && isFollowersOnly) {
            return "Only followers can chat and Messages are delayed by 3 seconds"
        }
        return ""
    },[isDelayed, isFollowersOnly]) 

    const label = useMemo(() => {
        if (isFollowersOnly && !isDelayed) {
                return "Followers Only"
        } else if (isDelayed && !isFollowersOnly) {
            return "Slow mode"
        } else if (isDelayed && isFollowersOnly) {
            return "Followers Only and slow mode"
        }
        return ""
    },[isDelayed, isFollowersOnly]) 

    if (!isDelayed && !isFollowersOnly) {
        return null
    }
  return (
    <div className="p-2 text-muted-foreground bg-white/5 border border-white/10 w-full rounded-t-md flex items-center gap-x-2">
      <Hint label={hint}>
        <Info  className="h-4 w-4"/>
      </Hint>
      <p className="text-xs font-semibold">
            {label}
      </p>
    </div>
  )
}

export default ChatInfo
