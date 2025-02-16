"use server";

import { serverFetch } from "@/common/helpers/serverFetch";
import {
  IAddEmployeePayload,
  IAddEmployeeResponse,
  IEmployee,
  IUpdateEmployeePayload,
} from "@/common/models/employee.model";
import { IResponse } from "@/common/models/response.model";
import { BASE_URL } from "@/common/repository/api";

const EMPLOYEE_API_URL = `${BASE_URL}/employees`;

export async function getAllEmployees(
  pageSize?: number,
  page = 1,
  search?: string
): Promise<IResponse<IEmployee[]>> {
  try {
    const url = new URL(EMPLOYEE_API_URL);

    url.searchParams.append("page", page.toString());
    if (pageSize) url.searchParams.append("pageSize", pageSize.toString());
    if (search) url.searchParams.append("search", search);

    const res = await serverFetch<IResponse<IEmployee[]>>(url.toString(), {
      method: "GET",
    });

    return res;
  } catch (error) {
    return { error: (error as Error).message };
  }
}

export async function addEmployee(payload: IAddEmployeePayload) {
  try {
    const res = await serverFetch<IResponse<IAddEmployeeResponse>>(
      EMPLOYEE_API_URL,
      {
        method: "POST",
        body: JSON.stringify(payload),
      }
    );

    return res;
  } catch (error) {
    return { error: (error as Error).message };
  }
}

export async function updateEmployee(
  id: string,
  payload: IUpdateEmployeePayload
) {
  try {
    const res = await serverFetch<IResponse<IEmployee>>(
      `${EMPLOYEE_API_URL}/${id}`,
      {
        method: "PATCH",
        body: JSON.stringify(payload),
      }
    );

    return res;
  } catch (error) {
    return { error: (error as Error).message };
  }
}

export async function deleteEmployee(id: string) {
  try {
    const res = await serverFetch<IResponse<string>>(
      `${EMPLOYEE_API_URL}/${id}`,
      {
        method: "DELETE",
      }
    );

    return res;
  } catch (error) {
    return { error: (error as Error).message };
  }
}
