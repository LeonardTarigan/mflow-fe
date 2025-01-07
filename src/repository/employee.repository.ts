"use server";

import type {
  IAddEmployeePayload,
  IEmployee,
  IUpdateEmployeePayload,
} from "@/model/employee.model";
import type { IResponse } from "@/model/general-types";
import { EMPLOYEE_API_URL } from "./api";
import { useFetch } from "@/hooks/shared/useFetch";
import type { ILoginResponse } from "@/model/auth.model";

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

export async function addEmployee(payload: IAddEmployeePayload) {
  try {
    const res = await useFetch<IResponse<ILoginResponse>>(EMPLOYEE_API_URL, {
      method: "POST",
      body: JSON.stringify(payload),
    });

    return res;
  } catch (error) {
    return { error: (error as Error).message };
  }
}

export async function updateEmployee(
  id: string,
  payload: IUpdateEmployeePayload,
) {
  try {
    const res = await useFetch<IResponse<ILoginResponse>>(
      `${EMPLOYEE_API_URL}/${id}`,
      {
        method: "PATCH",
        body: JSON.stringify(payload),
      },
    );

    return res;
  } catch (error) {
    // biome-ignore lint/suspicious/noConsoleLog: <explanation>
    console.log(error);
    return { error: (error as Error).message };
  }
}
