"use server";

import { cookies } from "next/headers";

export async function useFetch<T>(
  url: string,
  options: RequestInit = {},
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
      errorMessage = errorResponse.error || res.statusText;
    } catch (err) {
      console.error("Failed to parse error response:", err);
    }
    throw new Error(errorMessage);
  }

  return res.json();
}