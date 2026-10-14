import { auth, clerkClient } from "@clerk/nextjs/server";

// Keep one stable owner for local demo transactions across development reloads.
const LOCAL_USER_ID = "local-dev-user";

// The explicit flag is still ignored outside development, including production builds.
export const isLocalAuthBypassEnabled = () =>
  process.env.NODE_ENV === "development" &&
  process.env.NEXT_PUBLIC_LOCAL_AUTH_BYPASS === "true";

export const getCurrentUserId = async () => {
  if (isLocalAuthBypassEnabled()) {
    return LOCAL_USER_ID;
  }

  return (await auth()).userId;
};

export const userHasPremiumPlan = async (userId: string) => {
  if (isLocalAuthBypassEnabled()) {
    return true;
  }

  const user = await clerkClient().users.getUser(userId);
  return user.publicMetadata.subscriptionPlan === "premium";
};
