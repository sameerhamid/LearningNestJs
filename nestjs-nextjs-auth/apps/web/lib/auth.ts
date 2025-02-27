"use server";

import { redirect } from "next/navigation";
import { BACKEND_URL } from "./constants";
import { FormState, LoginFormSchema, SignUpFormSchema } from "./type";
import z from "zod";
import { createSession, updateTokens } from "./session";

interface SignInDataType {
  email: string;
  password: string;
}
interface SignUpDataType extends SignInDataType {
  name: string;
}
export async function signUp(
  state: FormState,
  formData: FormData
): Promise<FormState<SignUpDataType>> {
  const data: SignUpDataType = {
    name: formData.get("name") as string,
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  };
  const validationFields = SignUpFormSchema.safeParse(data);

  if (!validationFields.success) {
    return {
      error: validationFields.error.flatten().fieldErrors,
      data,
    };
  }

  const res = await fetch(`${BACKEND_URL}/auth/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(validationFields.data),
  });

  if (res.ok) {
    const result = await res.json();
    redirect("/auth/signin");
  } else {
    return {
      message: res.status === 409 ? "Email already exists" : res.statusText,
      data,
    };
  }
}

export const signIn = async (
  state: FormState,
  formData: FormData
): Promise<FormState<SignInDataType>> => {
  const data: SignInDataType = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  };
  const validatedFields = LoginFormSchema.safeParse(data);

  if (!validatedFields.success) {
    return {
      error: validatedFields.error.flatten().fieldErrors,
      data,
    };
  }

  const res = await fetch(`${BACKEND_URL}/auth/signin`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(validatedFields.data),
  });

  if (res.ok) {
    const result = await res.json();
    console.log("Login api response>>>>", result);
    //create the session for authenticated user
    await createSession({
      user: {
        id: result.id,
        name: result.name,
      },
      accessToken: result.accessToken,
      refreshToken: result.refreshToken,
    });
    redirect("/");
  } else {
    return {
      message:
        res.status === 401 ? "Invalid email or password" : res.statusText,
      data,
    };
  }
};

export const refreshToken = async (oldRefreshToken: string) => {
  try {
    const response = await fetch(`${BACKEND_URL}/auth/refresh`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${oldRefreshToken}`,
      },
    });
    if (!response.ok) {
      throw new Error("Failed to refresh token");
    }

    const result = await response.json();
    // update the session with new tokens
    // await updateTokens(result.accessToken!, result.refreshToken!);
    const updatedRes = await fetch("http://localhost:3000/api/auth/update", {
      method: "POST",
      body: JSON.stringify({
        accessToken: result.accessToken,
        refreshToken: result.refreshToken,
      }),
    });
    if (!updatedRes.ok) {
      throw new Error("Failed to update tokens");
    }
    return result.accessToken;
  } catch (error) {
    console.error("Error refreshing token:", error);
    return null;
  }
};
