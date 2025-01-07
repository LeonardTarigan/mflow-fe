"use server";

import type { IEmployee } from "@/model/employee.model";
import type { IResponse } from "@/model/general-types";
import { EMPLOYEE_API_URL } from "./api";
import { useFetch } from "@/hooks/shared/useFetch";

export async function getAllEmployees(
  page = 1,
  search?: string,
): Promise<IResponse<IEmployee[]>> {
  try {
    const url = new URL(EMPLOYEE_API_URL);

    url.searchParams.append("page", page.toString());

    if (search) {
      url.searchParams.append("search", search);
    }

    const res = await useFetch<IResponse<IEmployee[]>>(url.toString(), {
      method: "GET",
    });

    return res;
  } catch (error) {
    return { error: (error as Error).message };
  }
}
