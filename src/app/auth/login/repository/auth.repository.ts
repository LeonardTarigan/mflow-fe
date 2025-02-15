/* eslint-disable react-hooks/rules-of-hooks */

"use server";

import { serverFetch } from "@/common/helpers/serverFetch";
import { ILoginPayload, ILoginResponse } from "@/common/models/auth.model";
import { IResponse } from "@/common/models/response.model";
import { BASE_URL } from "@/common/repository/api";
import { cookies } from "next/headers";

const AUTH_API_URL = `${BASE_URL}/auth`;

export async function login(
  payload: ILoginPayload
): Promise<IResponse<ILoginResponse>> {
  try {
    const userData = await serverFetch<IResponse<ILoginResponse>>(
      `${AUTH_API_URL}/login`,
      {
        method: "POST",
        body: JSON.stringify(payload),
      }
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
    await serverFetch<string>(`${AUTH_API_URL}/logout`, {
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
