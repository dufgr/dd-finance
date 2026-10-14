import { getCurrentMonthTransactions } from "../get-current-month-transactions";
import { getCurrentUserId, userHasPremiumPlan } from "../../_lib/auth";

export const canUserAddTransaction = async () => {
  const userId = await getCurrentUserId();
  if (!userId) {
    throw new Error("Unauthorized");
  }
  if (await userHasPremiumPlan(userId)) {
    return true;
  }
  const currentMonthTransactions = await getCurrentMonthTransactions();
  if (currentMonthTransactions >= 10) {
    return false;
  }
  return true;
};
