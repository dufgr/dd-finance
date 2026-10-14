"use client";

import { UserButton } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { MenuIcon, XIcon } from "lucide-react";
import { useState } from "react";

const Navbar = () => {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const localAuthBypass =
    process.env.NODE_ENV === "development" &&
    process.env.NEXT_PUBLIC_LOCAL_AUTH_BYPASS === "true";
  const links = [
    { href: "/", label: "Dashboard" },
    { href: "/transactions", label: "Transações" },
    { href: "/subscription", label: "Assinatura" },
  ];

  return (
    <nav className="border-b border-solid">
      <div className="mx-auto flex w-full max-w-[1280px] flex-wrap items-center justify-between gap-3 px-4 py-3 sm:px-6 lg:px-8">
        <Link href="/" aria-label="dd.finance - início" className="shrink-0">
          <Image
            src="/logo.svg"
            width={173}
            height={39}
            alt="dd.finance"
            className="h-auto w-[132px] sm:w-[150px] md:w-[173px]"
          />
        </Link>

        <div className="hidden items-center gap-8 md:flex">
          {links.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className={
                pathname === href
                  ? "font-bold text-primary"
                  : "text-muted-foreground"
              }
            >
              {label}
            </Link>
          ))}
        </div>

        <div className="hidden md:block">
          {localAuthBypass ? (
            <span className="text-sm text-muted-foreground">Usuário local</span>
          ) : (
            <UserButton showName />
          )}
        </div>

        <button
          type="button"
          className="inline-flex h-10 w-10 items-center justify-center rounded-md border md:hidden"
          aria-label={menuOpen ? "Fechar menu" : "Abrir menu"}
          aria-expanded={menuOpen}
          aria-controls="mobile-navigation"
          onClick={() => setMenuOpen((open) => !open)}
        >
          {menuOpen ? <XIcon size={20} /> : <MenuIcon size={20} />}
        </button>

        {menuOpen && (
          <div
            id="mobile-navigation"
            className="order-last flex w-full flex-col gap-1 border-t pt-3 md:hidden"
          >
            {links.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                onClick={() => setMenuOpen(false)}
                className={`rounded-md px-3 py-2 ${
                  pathname === href
                    ? "bg-primary/10 font-bold text-primary"
                    : "text-muted-foreground"
                }`}
              >
                {label}
              </Link>
            ))}
            <div className="px-3 py-2">
              {localAuthBypass ? (
                <span className="text-sm text-muted-foreground">
                  Usuário local
                </span>
              ) : (
                <UserButton showName />
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
