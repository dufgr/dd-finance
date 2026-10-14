import type { Metadata } from "next";
import { Mulish } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import { Toaster } from "sonner";
import { isLocalAuthBypassEnabled } from "./_lib/auth";

const mulish = Mulish({
  subsets: ["latin-ext"],
});

export const metadata: Metadata = {
  title: "DD Finance",
  description: "Plataforma de gestão financeira pessoal",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const content = (
    <div className="min-h-screen w-full overflow-x-clip">{children}</div>
  );

  return (
    <html lang="pt-BR">
      <body className={`${mulish.className} dark antialiased`}>
        {isLocalAuthBypassEnabled() ? (
          content
        ) : (
          <ClerkProvider
            appearance={{
              baseTheme: dark,
            }}
          >
            {content}
          </ClerkProvider>
        )}

        <Toaster />
      </body>
    </html>
  );
}
