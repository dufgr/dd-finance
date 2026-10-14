import Image from "next/image";
import { Button } from "../_components/ui/button";
import { LogInIcon } from "lucide-react";
import { SignInButton } from "@clerk/nextjs";
import Link from "next/link";
import { redirect } from "next/navigation";
import { getCurrentUserId, isLocalAuthBypassEnabled } from "../_lib/auth";

const LoginPage = async () => {
  const localAuthBypass = isLocalAuthBypassEnabled();
  const userId = await getCurrentUserId();
  if (userId && !localAuthBypass) {
    redirect("/");
  }
  return (
    <main className="mx-auto grid min-h-screen w-full max-w-[1280px] grid-cols-1 md:grid-cols-2">
      {/* ESQUERDA */}
      <div className="mx-auto flex min-h-[60vh] w-full max-w-[550px] flex-col justify-center px-6 py-12 sm:px-8 md:min-h-screen">
        <Image
          src="/logo.svg"
          width={173}
          height={39}
          alt="DD Finance"
          className="mb-8"
        />
        <h1 className="mb-3 text-4xl font-bold">Bem-vindo</h1>
        <p className="mb-8 text-muted-foreground">
          A DD Finance é uma plataforma de gestão financeira que utiliza IA para
          monitorar suas movimentações, e oferecer insights personalizados,
          facilitando o controle do seu orçamento.
        </p>
        {localAuthBypass ? (
          <Button asChild variant="outline">
            <Link href="/">
              <LogInIcon className="mr-2" />
              Acessar ambiente local
            </Link>
          </Button>
        ) : (
          <SignInButton>
            <Button variant="outline">
              <LogInIcon className="mr-2" />
              Fazer login ou criar conta
            </Button>
          </SignInButton>
        )}
      </div>
      {/* DIREITA */}
      <div className="relative hidden min-h-screen w-full bg-gradient-to-br from-[#55B02E]/30 via-background to-background md:block" />
    </main>
  );
};

export default LoginPage;
