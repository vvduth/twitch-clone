import { db } from "./db";
import { getSelf } from "./auth-service";

export const isBlockByUser = async (id: string) => {
  try {
    const self = await getSelf();

    const otherUser = await db.user.findUnique({
      where: {
        id: id,
      },
    });

    if (!otherUser) {
      throw new Error("User not found");
    }

    if (otherUser.id === self.id) {
      return false;
    }

    // use find unique will use index on unique contrain for faster qury

    const existingBlock = await db.block.findUnique({
      where: {
        blockerId_blockedId: {
          blockerId: otherUser.id,
          blockedId: self.id,
        },
      },
    });

    return !!existingBlock;
  } catch (error) {
    return false;
  }
};

export const blockUser = async (id: string) => {
  const self = await getSelf();

  if (self.id === id) {
    throw new Error("Cannot block yourself");
  }

  const otherUser = await db.user.findUnique({
    where: {
      id: id,
    },
  });

  if (!otherUser) {
    throw new Error("User not found");
  }

  const existingBlock = await db.block.findUnique({
    where: {
      blockerId_blockedId: {
        blockerId: self.id,
        blockedId: otherUser.id,
      },
    },
  });

  if (existingBlock) {
    throw new Error("already blocked");
  }

  const block = await db.block.create({
    data: {
      blockerId: self.id,
      blockedId: otherUser.id,
    },
    include: {
      blocked: true,
    },
  });

  return block
};


export const unblockUser = async (id: string) => {
    const self = await getSelf();
  
    if (self.id === id) {
      throw new Error("Cannot block yourself");
    }
  
    const otherUser = await db.user.findUnique({
      where: {
        id: id,
      },
    });
  
    if (!otherUser) {
      throw new Error("User not found");
    }
  
    const existingBlock = await db.block.findUnique({
      where: {
        blockerId_blockedId: {
          blockerId: self.id,
          blockedId: otherUser.id,
        },
      },
    });
  
    if (!existingBlock) {
      throw new Error("Cannot unblock cuz this user in not blocked");
    }
  
    const unblock = await db.block.delete({
      where: {
        id: existingBlock.id
      },
      include: {
        blocked: true
      }
    });
  
    return unblock
  };

  export const getBlockUsers = async () => {
    const self = await getSelf()
    const blockedUsers = await db.block.findMany({
      where: {
        blockedId: self.id
      },
      include: {
        blocked: true
      }
    })

    return blockedUsers
  }
  