import { db } from "@/app/_lib/prisma";
import { TransactionType } from "@prisma/client";
import { TotalExpensePerCategory, TransactionPercentagePerType } from "./types";
import { getCurrentUserId } from "../../_lib/auth";
import { getMonthRange } from "../../_utils/month-range";

export const getDashboard = async (month: string) => {
  const userId = await getCurrentUserId();
  if (!userId) {
    throw new Error("Unauthorized");
  }
  const { start, end } = getMonthRange(month);
  const where = {
    userId,
    date: {
      gte: start,
      lt: end,
    },
  };
  const depositsTotal = Number(
    (
      await db.transaction.aggregate({
        where: { ...where, type: "DEPOSIT" },
        _sum: { amount: true },
      })
    )?._sum?.amount,
  );
  const investmentsTotal = Number(
    (
      await db.transaction.aggregate({
        where: { ...where, type: "INVESTMENT" },
        _sum: { amount: true },
      })
    )?._sum?.amount,
  );
  const expensesTotal = Number(
    (
      await db.transaction.aggregate({
        where: { ...where, type: "EXPENSE" },
        _sum: { amount: true },
      })
    )?._sum?.amount,
  );
  const balance = depositsTotal - investmentsTotal - expensesTotal;
  const transactionsTotal = Number(
    (
      await db.transaction.aggregate({
        where,
        _sum: { amount: true },
      })
    )._sum.amount,
  );
  const typesPercentage: TransactionPercentagePerType = {
    [TransactionType.DEPOSIT]: transactionsTotal
      ? Math.round((depositsTotal / transactionsTotal) * 100)
      : 0,
    [TransactionType.EXPENSE]: transactionsTotal
      ? Math.round((expensesTotal / transactionsTotal) * 100)
      : 0,
    [TransactionType.INVESTMENT]: transactionsTotal
      ? Math.round((investmentsTotal / transactionsTotal) * 100)
      : 0,
  };
  const totalExpensePerCategory: TotalExpensePerCategory[] = (
    await db.transaction.groupBy({
      by: ["category"],
      where: {
        ...where,
        type: TransactionType.EXPENSE,
      },
      _sum: {
        amount: true,
      },
    })
  ).map((category) => ({
    category: category.category,
    totalAmount: Number(category._sum.amount),
    percentageOfTotal: expensesTotal
      ? Math.round((Number(category._sum.amount) / expensesTotal) * 100)
      : 0,
  }));
  const lastTransactions = await db.transaction.findMany({
    where,
    orderBy: { date: "desc" },
    take: 15,
  });
  return {
    balance,
    depositsTotal,
    investmentsTotal,
    expensesTotal,
    typesPercentage,
    totalExpensePerCategory,
    lastTransactions: JSON.parse(JSON.stringify(lastTransactions)),
  };
};
