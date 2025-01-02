"use server";

import type { ILoginPayload, ILoginResponse } from "@/model/auth.model";
import type { IResponse } from "@/model/general-types";
import { cookies } from "next/headers";
import { AUTH_API_URL, useFetch } from "./api";

export async function login(
  payload: ILoginPayload,
): Promise<IResponse<ILoginResponse>> {
  try {
    const userData = await useFetch<ILoginResponse>(`${AUTH_API_URL}/login`, {
      method: "POST",
      body: JSON.stringify(payload),
    });

    cookies().set("user", JSON.stringify(userData.user));
    cookies().set("token", JSON.stringify(userData.token));

    return { data: userData };
  } catch (error) {
    return { error: (error as Error).message };
  }
}
