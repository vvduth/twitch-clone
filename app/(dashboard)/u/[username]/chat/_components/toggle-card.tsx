"use client";

import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";
import { useTransition } from "react";
import { updateStream } from "@/actions/stream";
import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

type FieldType = "isChatEnabled" | "isChatDelayed" | "isChatFollowersOnly";

interface ToggleCardProps {
  field: FieldType;
  label: string;
  value: boolean;
}
const ToggleCard = ({ field, label, value = false }: ToggleCardProps) => {
  const [isPending, startTransition] = useTransition();
  const onChage = () => {
    startTransition(() => {
      updateStream({ [field]: !value })
        .then(() => toast.success("Chat setting updated"))
        .catch(() => toast.error("Something went wrong"));
    });
  };
  return (
    <div className="rounded-xl bg-muted p-6">
      <div className="flex items-center justify-between">
        <p className="font-semibold shrink-0">{label}</p>
        <div className="space-y-2">
          <Switch
            onCheckedChange={onChage}
            disabled={isPending}
          checked={value}>{value ? "On" : "Off"}</Switch>
        </div>
      </div>
    </div>
  );
};

export const ToggleCardSkeleton = ( ) => {
  return (
    <Skeleton className="rounded-xl p-10 w-full" />
  )
}
export default ToggleCard;
