"use client";
import { cn } from "@/lib/utils";
import { useCreatorSideBar } from "@/store/user-creator-sidebar";
import React from "react";

interface WrapperProps {
  children: React.ReactNode;
}

const Wrapper = ({ children }: WrapperProps) => {
  const { collapsed } = useCreatorSideBar((state) => state);
  return (
    <aside className={cn(
      "fixed left-0 flex flex-col w-[70px] lg:w-60 h-full bg-background border-r border-[#2D2E35] z-50",
      collapsed && "lg:w-[70px]"
    )}>
      {children}
    </aside>
  );
};

export default Wrapper;
