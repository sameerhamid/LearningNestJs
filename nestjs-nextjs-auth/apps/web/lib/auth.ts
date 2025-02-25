"use server";

import { redirect } from "next/navigation";
import { BACKEND_URL } from "./constants";
import { FormState, LoginFormSchema, SignUpFormSchema } from "./type";
import z from "zod";

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
    redirect("/");
  } else {
    return {
      message:
        res.status === 401 ? "Invalid email or password" : res.statusText,
      data,
    };
  }
};
