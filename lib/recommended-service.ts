import { db } from "./db";
import { getSelf } from "./auth-service";

export const getRecommended = async () => {
  // load all user in db
  const users = await db.user.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  return users;
};
