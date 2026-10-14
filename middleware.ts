import { clerkMiddleware } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

const localAuthBypassEnabled =
  process.env.NODE_ENV === "development" &&
  process.env.NEXT_PUBLIC_LOCAL_AUTH_BYPASS === "true";

export default localAuthBypassEnabled
  ? () => NextResponse.next()
  : clerkMiddleware();

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
};
