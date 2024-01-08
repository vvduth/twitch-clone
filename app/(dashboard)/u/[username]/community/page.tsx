import React from "react";
import { DataTable } from "./_components/data-table";
import {  columns } from "./_components/columns";
import { getBlockUsers } from "@/lib/block-service";
import { format } from "date-fns";

const CommunityPage = async () => {
  const blockedUsers = await getBlockUsers();

  const formattedData = blockedUsers.map((block)  => ({
    ...block, 
    userId: block.blockedId,
    imageUrl: block.blocked.imageUrl,
    username: block.blocked.username,
    createdAt: format(new Date(block.blocked.createdAt), "dd/MM/yyyy")
  }))

  return (
    <div className="p-6">
      <div className="mb-4">
        <h1 className="text-2xl font-bold">Community Settings</h1>
      </div>
      <DataTable columns={columns} data={formattedData} />
    </div>
  );
};

export default CommunityPage;
