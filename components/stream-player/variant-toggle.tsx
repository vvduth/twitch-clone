"use client";
import React from "react";
import { ArrowLeftFromLine, ArrowRightFromLine, MessageSquare, User } from "lucide-react";

import { Hint } from "../hint";
import { Button } from "../ui/button";
import { ChatVariant, useChatSideBar } from "@/store/use-chat-sidebar";

const VariantToggle = () => {
  const { variant, onChangeVariant } = useChatSideBar((state) => state);

  const isChat = variant === ChatVariant.CHAT;

  let Icon = isChat ? User : MessageSquare;
  const onToggle = () => {

    const newvariant = isChat ? ChatVariant.COMMUNITY : ChatVariant.CHAT
    onChangeVariant(newvariant)
    
  };

  const label = isChat ? "Community" : "Go back to chat"
  return (
    <Hint label ={label} side="left"  asChild>
        <Button
        onClick={onToggle}
        variant={"ghost"}
        className="h-auto p-2 hover:bg-white/10 hover:text-primary bg-transparent"
        >
            <Icon className="h-4 w-4" />
        </Button>
    </Hint>
  );
};

export default VariantToggle;
