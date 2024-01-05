"use client";
import React from "react";
import { ConnectionState, Track } from "livekit-client";
import {
  useConnectionState,
  useRemoteParticipant,
  useRemoteParticipants,
  useTrack,
  useTracks,
} from "@livekit/components-react";
import OfflineVideo from "./offline-video";
import LoadingVideo from "./loading-video";
import LiveVideo from "./live-video";
import { Skeleton } from "../ui/skeleton";

interface VideoProps {
  hostname: string;
  hostIdentity: string;
}
const Video = ({ hostIdentity, hostname }: VideoProps) => {
  const connectioNState = useConnectionState();
  const participant = useRemoteParticipant(hostIdentity);
  const tracks = useTracks([
    Track.Source.Camera,
    Track.Source.Microphone,
  ]).filter((track) => track.participant.identity === hostIdentity);

  let content;
  if (!participant && connectioNState === ConnectionState.Connected) {
    content = <OfflineVideo username={hostname} />;
  } else if (!participant || tracks.length === 0) {
    content = <LoadingVideo label={connectioNState} />
  } else {
    content = <LiveVideo participant={participant} />;
  }
  return <div className="aspect-video border-b group relative">{content}</div>;
};

export const VideoSkeleton = () => {
  return (
    <div className="aspect-video border-x border-background">
      <Skeleton className="h-full w-full rounded-none" />
    </div>
  );
};

export default Video;
