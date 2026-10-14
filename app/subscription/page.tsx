import Navbar from "../_components/navbar";
import { redirect } from "next/navigation";
import { Card, CardContent, CardHeader } from "../_components/ui/card";
import { CheckIcon, XIcon } from "lucide-react";
import AcquirePlanButton from "./_components/acquire-plan-button";
import { Badge } from "../_components/ui/badge";
import { getCurrentMonthTransactions } from "../_data/get-current-month-transactions";
import {
  getCurrentUserId,
  isLocalAuthBypassEnabled,
  userHasPremiumPlan,
} from "../_lib/auth";

const SubscriptionPage = async () => {
  const userId = await getCurrentUserId();
  if (!userId) {
    redirect("/login");
  }
  const currentMonthTransactions = await getCurrentMonthTransactions();
  const hasPremiumPlan = await userHasPremiumPlan(userId);
  const localAuthBypass = isLocalAuthBypassEnabled();
  return (
    <>
      <Navbar />
      <main className="mx-auto w-full max-w-[1280px] space-y-6 px-4 py-5 sm:px-6 lg:px-8">
        <h1 className="text-2xl font-bold">Assinatura</h1>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <Card className="w-full min-w-0">
            <CardHeader className="border-b border-solid py-8">
              <h2 className="text-center text-2xl font-semibold">
                Plano Básico
              </h2>
              <div className="flex items-center justify-center gap-3">
                <span className="text-4xl">R$</span>
                <span className="text-6xl font-semibold">0</span>
                <div className="text-2xl text-muted-foreground">/mês</div>
              </div>
            </CardHeader>
            <CardContent className="space-y-6 py-8">
              <div className="flex items-center gap-2">
                <CheckIcon className="text-primary" />
                <p>
                  Apenas 10 transações por mês ({currentMonthTransactions}/10)
                </p>
              </div>
              <div className="flex items-center gap-2">
                <XIcon />
                <p>Relatórios de IA</p>
              </div>
            </CardContent>
          </Card>

          <Card className="w-full min-w-0">
            <CardHeader className="relative border-b border-solid py-8">
              {hasPremiumPlan && (
                <Badge className="absolute left-4 top-12 bg-primary/10 text-primary">
                  Ativo
                </Badge>
              )}
              <h2 className="text-center text-2xl font-semibold">
                Plano Premium
              </h2>
              <div className="flex items-center justify-center gap-3">
                <span className="text-4xl">R$</span>
                <span className="text-6xl font-semibold">19</span>
                <div className="text-2xl text-muted-foreground">/mês</div>
              </div>
            </CardHeader>
            <CardContent className="space-y-6 py-8">
              <div className="flex items-center gap-2">
                <CheckIcon className="text-primary" />
                <p>Transações ilimitadas</p>
              </div>
              <div className="flex items-center gap-2">
                <CheckIcon className="text-primary" />
                <p>Relatórios de IA</p>
              </div>
              <AcquirePlanButton localAuthBypass={localAuthBypass} />
            </CardContent>
          </Card>
        </div>
      </main>
    </>
  );
};

export default SubscriptionPage;
