import { isFollowingUser } from "@/lib/follow-service";
import { getUserByUsername } from "@/lib/user-service";
import { notFound } from "next/navigation";
import React from "react";
import Actions from "./_components/actions";
import { isBlockByUser } from "@/lib/block-service";
import { currentUser } from "@clerk/nextjs";

interface UserPageProps {
  params: {
    username: string;
  };
}
const UserPage = async ({ params }: UserPageProps) => {
  const user = await getUserByUsername(params.username);
  const currentLoggedInUser = await currentUser();

  if (!user) {
    notFound();
  }

  const isFollowing = await isFollowingUser(user.id);
  const isBlockByThisUser = await isBlockByUser(user.id);

  return (
    <div className="flex flex-col gap-y-4">
      <p>Username: {user.username}</p>
      <p>user id : {user.id}</p>
      <p>Is following : {`${isFollowing}`}</p>
      <p>
        Are you {`user (${currentLoggedInUser?.username})`} being blocked by
        this user {user.username}: {`${isBlockByThisUser}`}
      </p>
      <Actions userId={user.id} isFollowing={isFollowing} />
    </div>
  );
};

export default UserPage;
