"use server";

import type { ILoginPayload, ILoginResponse } from "@/model/auth.model";
import type { IResponse } from "@/model/general-types";
import { BASE_URL } from "./api";
import { cookies } from "next/headers";

export async function login(
  payload: ILoginPayload,
): Promise<IResponse<ILoginResponse>> {
  const res = await fetch(`${BASE_URL}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    let errorMessage = "An unknown error occurred";
    try {
      const errorResponse = await res.json();
      errorMessage = errorResponse.error || res.statusText;
    } catch (err) {
      console.error("Failed to parse error response:", err);
    }

    return { error: errorMessage };
  }

  const userData: ILoginResponse = await res.json();

  cookies().set("user", JSON.stringify(userData.user));
  cookies().set("token", JSON.stringify(userData.token));

  return {
    data: userData,
  };
}
