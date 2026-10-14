import { db } from "@/app/_lib/prisma";
import { endOfMonth, startOfMonth } from "date-fns";
import { getCurrentUserId } from "../../_lib/auth";

export const getCurrentMonthTransactions = async () => {
  const userId = await getCurrentUserId();
  if (!userId) {
    throw new Error("Unauthorized");
  }
  return db.transaction.count({
    where: {
      userId,
      createdAt: {
        gte: startOfMonth(new Date()),
        lt: endOfMonth(new Date()),
      },
    },
  });
};
