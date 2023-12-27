import React from "react";
import Wrapper from "./wrapper";
import Togggle, { ToggleSkeleton } from "./togggle";
import Recommended, { RecommendedSkeleton } from "./recommended";
import { getRecommended } from "@/lib/recommended-service";
import { getFollowedUsers } from "@/lib/follow-service";
import Following, { FollowingSkeleton } from "./following";

const Sidebar = async () => {
  // fetch followed
  const recommended = await getRecommended();
  const follows = await getFollowedUsers();
  // fetch recommend user
  return (
    <Wrapper>
      <Togggle />
      <div className="space-y-4 pt-4 lg:pt-0">
        <Following data={follows} />
        <Recommended data={recommended} />
      </div>
    </Wrapper>
  );
};

export const SidebarSkeleton = () => {
  return (
    <aside
      className="fixed left-0 flex flex-col 
    w-[70px] lg:w-60 h-full bg-rounded border-r 
    border-[#2D2E35] z-50"
    >
      <ToggleSkeleton />
      <FollowingSkeleton />
      <RecommendedSkeleton />
    </aside>
  );
};

export default Sidebar;
