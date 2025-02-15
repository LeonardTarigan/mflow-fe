"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function serverFetch<T>(
  url: string,
  options: RequestInit = {}
): Promise<T> {
  const token = cookies().get("token")?.value;

  const defaultHeaders = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };

  const mergedOptions: RequestInit = {
    ...options,
    headers: {
      ...defaultHeaders,
      ...options.headers,
    },
  };

  const res = await fetch(url, mergedOptions);

  if (!res.ok) {
    let errorMessage = "An unknown error occurred";
    try {
      const errorResponse = await res.json();

      const hasCookies = Boolean(cookies().get("token"));

      if (errorResponse.error?.statusCode === 401 && hasCookies) {
        cookies().delete("user");
        cookies().delete("token");

        redirect("/");
      }

      errorMessage = errorResponse.error || res.statusText;
    } catch (err) {
      throw new Error("Failed to parse error response: " + err);
    }

    throw new Error(errorMessage);
  }

  return res.json();
}
