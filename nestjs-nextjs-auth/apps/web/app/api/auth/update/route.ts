import { updateTokens } from "@/lib/session";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { accessToken, refreshToken } = body;
  if (!accessToken || !refreshToken) {
    return NextResponse.json({ message: "Tokens not found" }, { status: 401 });
  }
  await updateTokens(accessToken, refreshToken);
  return NextResponse.json({ message: "Tokens Updated" }, { status: 200 });
}
