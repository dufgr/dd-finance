import { redirect } from "next/navigation";
import Navbar from "../_components/navbar";
import SummaryCards from "./_components/summary-cards";
import TimeSelect from "./_components/time-select";
import TransactionsPieChart from "./_components/transactions-pie-chart";
import { getDashboard } from "../_data/get-dashboard";
import ExpensesPerCategory from "./_components/expenses-per-category";
import LastTransactions from "./_components/last-transactions";
import { canUserAddTransaction } from "../_data/can-user-add-transaction";
import AiReportButton from "./_components/ai-report-button";
import { getCurrentUserId, userHasPremiumPlan } from "../_lib/auth";

interface HomeProps {
  searchParams: {
    month: string;
  };
}

const Home = async ({ searchParams: { month } }: HomeProps) => {
  const userId = await getCurrentUserId();
  if (!userId) {
    redirect("/login");
  }
  const monthIsInvalid = !/^(0[1-9]|1[0-2])$/.test(month ?? "");
  if (monthIsInvalid) {
    const currentMonth = String(new Date().getMonth() + 1).padStart(2, "0");
    redirect(`?month=${currentMonth}`);
  }
  const dashboard = await getDashboard(month);
  const userCanAddTransaction = await canUserAddTransaction();
  const hasPremiumPlan = await userHasPremiumPlan(userId);
  return (
    <>
      <Navbar />
      <main className="mx-auto flex w-full max-w-[1280px] flex-col gap-6 px-4 py-5 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <h1 className="text-2xl font-bold">Dashboard</h1>
          <div className="flex flex-wrap items-center gap-2 sm:gap-3">
            <AiReportButton month={month} hasPremiumPlan={hasPremiumPlan} />
            <TimeSelect />
          </div>
        </div>
        <section className="grid min-w-0 grid-cols-1 gap-6 xl:grid-cols-[minmax(0,2fr)_minmax(0,1fr)]">
          <div className="grid min-w-0 gap-6">
            <SummaryCards
              month={month}
              {...dashboard}
              userCanAddTransaction={userCanAddTransaction}
            />
            <div className="grid min-w-0 grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
              <TransactionsPieChart {...dashboard} />
              <ExpensesPerCategory
                expensesPerCategory={dashboard.totalExpensePerCategory}
              />
            </div>
          </div>
          <LastTransactions lastTransactions={dashboard.lastTransactions} />
        </section>
      </main>
    </>
  );
};

export default Home;
