"use client";
import { Button } from "@/components/ui/button";
import { IngressInput } from "livekit-server-sdk";
import {
  Dialog,
  DialogContent,
  DialogClose,
  DialogHeader,
  DialogTrigger,
  DialogTitle,
} from "@/components/ui/dialog";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import React, { useState } from "react";
import { AlertTriangle } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
const RTMP = String(IngressInput.RTMP_INPUT);
const WHIP = String(IngressInput.WHIP_INPUT)

type ingressType = typeof RTMP | typeof WHIP;

const ConnectModal = () => {
  const [ingressType, setIngressType] = useState<ingressType>(RTMP)
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant={"primary"}>Generate connection</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogHeader>Generate connection</DialogHeader>
        </DialogHeader>
        <Select
          value={ingressType}
          onValueChange={(value) => setIngressType(value)}
        >
            <SelectTrigger className="w-full">
                <SelectValue placeholder="Ingress type" />
            </SelectTrigger>
            <SelectContent>
                <SelectItem value={RTMP} >RTMP</SelectItem>
                <SelectItem value={WHIP}>WHIP</SelectItem>
            </SelectContent>
        </Select>
        <Alert>
          <AlertTriangle className="h-4 w-4" />
          <AlertTitle>Warning</AlertTitle>
          <AlertDescription>
            This action will reset all active stream using the current
            connection
          </AlertDescription>
        </Alert>
        <div className="flex justify-between">
          <DialogClose>
            <Button variant={"ghost"}>Cancel</Button>
            <Button onClick={() => {}} variant={"primary"}>
              Generate
            </Button>
          </DialogClose>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ConnectModal;
