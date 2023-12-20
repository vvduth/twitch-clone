"use client";

import { useEffect } from "react";
import { useMediaQuery } from "usehooks-ts";

import React from "react";
import { useSideBar } from "@/store/use-sidebar";
import { cn } from "@/lib/utils";

interface ContainerProps {
  children: React.ReactNode;
}
const Container = ({ children }: ContainerProps) => {
  // js way to know if we are in desktto or mobile
  const matches = useMediaQuery("(max-width: 1024px)");
  const { collapsed, onCollapse, onExpand } = useSideBar((state) => state);
  useEffect(() => {
    if (matches) {
      onCollapse();
    } else {
      onExpand;
    }
  }, [matches, onCollapse, onExpand]);

  return (
    <div
      className={cn("flex-1", collapsed ? "ml-[70px]" : "ml-[70px] lg:ml-60")}
    >
      {children}
    </div>
  );
};

export default Container;
