import { db } from "./db";
import { getSelf } from "./auth-service";

export const getRecommended = async () => {
  let userId;

  try {
    const self = await getSelf();
    userId = self.id;
  } catch (error) {
    userId = null;
  }

  let users = [];

  if (userId) {
    users = await db.user.findMany({
      where: {
        AND: [
          {
            NOT: {
              id: userId,
            },
          },
          {
            NOT: {
              followedBy: {
                some: {
                  // not recommned users that currently logged user is following
                  followerId: userId
                }
              }
            }
          },
          // none of the recommed is blocking the current user
          {
            NOT: {
              blocking: {
                some: {
                  blockedId: userId
                }
              }
            }
          }
        ],
      },
      include: {
        stream: {
          select: {
            isLive: true
          }
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });
  } else {
    // load all user in db
    users = await db.user.findMany({
      include: {
        stream: {
          select: {
            isLive: true
          }
        }
      },
      orderBy: {
        createdAt: "desc",
      },
    });
  }

  return users;
};
