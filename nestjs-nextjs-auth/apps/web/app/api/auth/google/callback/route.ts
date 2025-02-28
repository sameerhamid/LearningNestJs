import { createSession } from "@/lib/session";
import { redirect } from "next/navigation";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  const url = new URL(req.url);
  const accessToken = url.searchParams.get("accessToken");
  const refreshToken = url.searchParams.get("refreshToken");
  const userId = url.searchParams.get("userId");
  const name = url.searchParams.get("name");

  if (!accessToken || !refreshToken || !userId || !name) {
    throw new Error("Google  OAuth callback failed");
  }

  await createSession({
    user: {
      id: userId,
      name: name,
    },
    accessToken,
    refreshToken,
  });

  return redirect("/");
}
