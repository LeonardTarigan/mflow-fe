"use server";

import type { ILoginPayload, ILoginResponse } from "@/model/auth.model";
import type { IResponse } from "@/model/general-types";
import { cookies } from "next/headers";
import { AUTH_API_URL } from "./api";
import { useFetch } from "@/hooks/shared/useFetch";

export async function login(
  payload: ILoginPayload,
): Promise<IResponse<ILoginResponse>> {
  try {
    const userData = await useFetch<IResponse<ILoginResponse>>(
      `${AUTH_API_URL}/login`,
      {
        method: "POST",
        body: JSON.stringify(payload),
      },
    );

    if (userData.data) {
      cookies().set("user", JSON.stringify(userData.data.user));
      cookies().set("token", userData.data.token);
    }

    return userData;
  } catch (error) {
    return { error: (error as Error).message };
  }
}

export async function logout(): Promise<IResponse<string>> {
  const cookie = cookies().get("user")?.value;

  const user = cookie ? JSON.parse(cookie) : null;

  try {
    await useFetch<string>(`${AUTH_API_URL}/logout`, {
      method: "POST",
      body: JSON.stringify({ id: user?.id }),
    });

    cookies().delete("user");
    cookies().delete("token");

    return { data: "Berhasil keluar!" };
  } catch (error) {
    return { error: (error as Error).message };
  }
}
