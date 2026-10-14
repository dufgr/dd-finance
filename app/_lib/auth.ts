import { auth, clerkClient } from "@clerk/nextjs/server";

const LOCAL_USER_ID = "local-dev-user";

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
