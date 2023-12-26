import { cn } from "@/lib/utils";
import { Skeleton } from "./ui/skeleton";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import LiveBadge from "./live-bagde";

const avatarSize = cva("", {
  variants: {
    size: {
      default: "h-8 w-8",
      lg: "h-14 w-14",
    },
  },
  defaultVariants: {
    size: "default",
  },
});

interface UserAvatarProps extends VariantProps<typeof avatarSize> {
  username: string;
  imageUrl: string;
  isLive?: boolean;
  showBadge?: boolean;
}
const UserAvatar = ({
  username,
  imageUrl,
  size,
  isLive,
  showBadge,
}: UserAvatarProps) => {
  const canShowBadge = showBadge && isLive;
  return (
    <div className="relative">
      <Avatar
        className={cn(
          isLive && "ring-2 ring-rose-500 border border-background",
          avatarSize({ size })
        )}
      >
        <AvatarImage src={imageUrl} className="object-cover" />
        <AvatarFallback>
          {username[0]}
          {username[username.length - 1]}
        </AvatarFallback>
      </Avatar>
      {canShowBadge && (
        <div className="absolute -bottom-3 left-1/2 transform -translate-x-1/2">
          <LiveBadge />
        </div>
      )}
    </div>
  );
};

interface userAvatarSkeletonProps extends VariantProps<typeof avatarSize> {}

export const UserAvatarSkeleton = ({ size }: userAvatarSkeletonProps) => {
  return <Skeleton className={cn("rounded-full", avatarSize({ size }))} />;
};

export default UserAvatar;
