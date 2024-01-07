"use client";

import { toast } from "sonner";
import { Heart } from "lucide-react";
import { useTransition } from "react";
import { useAuth } from "@clerk/nextjs";
import { useRouter } from "next/navigation";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { onFollow, onUnfollow } from "@/actions/follow";

interface ActionsProps {
  hostIdentity: string;
  isFollowing: boolean;
  isHost: boolean;
}

export const Actions = ({
  hostIdentity,
  isFollowing,
  isHost,
}: ActionsProps) => {
  const [isPending, startTransititon] = useTransition();
  const router = useRouter();
  const { userId } = useAuth();

  const handleFollow = () => {
    startTransititon(() => {
      onFollow(hostIdentity)
        .then((data) =>
          toast.success(`You are now following ${data.following.username}`)
        )
        .catch(() => toast.error("Something went wrong"));
    });
  };

  const handleUnFollow = () => {
    startTransititon(() => {
      onUnfollow(hostIdentity)
        .then((data) =>
          toast.success(`You  UNFOLLOWED ${data.following.username}`)
        )
        .catch(() => toast.error("Something went wrong"));
    });
  };
  const toggleFollow = () => {
    if (!userId) {
      // redirect the user
      return router.push("/sign-in");
    }
    if (isHost) {
      return;
    }

    if (isFollowing) {
      handleUnFollow()
    } else {
      handleFollow()
    }
  };
  return (
    <Button
    disabled={isPending || isHost}
      onClick={toggleFollow}
      variant={"primary"}
      size={"sm"}
      className="w-full lg:w-auto"
    >
      <Heart
        className={cn("h-4 w-4 mr-2", isFollowing ? "fill-white" : "fill-none")}
      />
      {isFollowing ? "Unfollow" : "Follow"}
    </Button>
  );
};


export const ActionsSkeleton = ( ) => {
  return (
    <Skeleton className="h-10 w-full lg:w-24" />
  )
}