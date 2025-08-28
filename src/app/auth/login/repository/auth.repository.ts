"use server";

import { serverFetch } from "@/common/helpers/serverFetch";
import { ILoginPayload, ILoginResponse } from "@/common/models/auth.model";
import { IResponse } from "@/common/models/response.model";
import { BASE_URL } from "@/common/repository/api";
import { cookies } from "next/headers";

const AUTH_API_URL = `${BASE_URL}/auth`;

export async function login(
  payload: ILoginPayload,
): Promise<IResponse<ILoginResponse>> {
  try {
    const userData = await serverFetch<IResponse<ILoginResponse>>(
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
  cookies().delete("user");
  cookies().delete("token");

  return { data: "Berhasil keluar!" };
}
