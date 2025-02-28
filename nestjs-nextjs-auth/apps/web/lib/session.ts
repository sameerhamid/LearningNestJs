"use server";

import { jwtVerify, SignJWT } from "jose";
import { SESSION_SECRET_KEY } from "./constants";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export type Session = {
  user: {
    id: string;
    name: string;
  };
  accessToken: string;
  refreshToken: string;
};

const encodedKey = new TextEncoder().encode(SESSION_SECRET_KEY);
const SESSION = "session";
const ALGO = "HS256";

export async function createSession(payload: Session) {
  const expiredAt = new Date(Date.now() + 1000 * 60 * 60 * 24 * 7);

  // encrypt the payload using jose and set the expiration time to 7 days from now
  const session = await new SignJWT(payload)
    .setProtectedHeader({ alg: ALGO })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(encodedKey);

  // set the session cookie with the encrypted payload
  (await cookies()).set(SESSION, session, {
    expires: expiredAt,
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    path: "/", // default
  });
}

export async function getSession() {
  cookies();
  const cookie = (await cookies()).get(SESSION);
  if (!cookie) {
    return null;
  }

  try {
    // verify the session using jose and return the payload
    const { payload } = await jwtVerify(cookie.value, encodedKey, {
      algorithms: [ALGO],
    });

    return payload as Session;
  } catch (error) {
    // if the session is invalid, redirect to the login page
    console.error("Failed to verify the session", error);
    redirect("/auth/signin");
  }
}

export async function deleteSession() {
  (await cookies()).delete(SESSION);
}

export async function updateTokens(accessToken: string, refreshToken: string) {
  const cookie = (await cookies()).get(SESSION)?.value;
  if (!cookie) return null;

  const { payload } = await jwtVerify<Session>(cookie, encodedKey);

  if (!payload) {
    throw new Error("Session not found");
  }

  const newPayload: Session = {
    user: { ...payload.user },
    accessToken,
    refreshToken,
  };

  await createSession(newPayload);
}
