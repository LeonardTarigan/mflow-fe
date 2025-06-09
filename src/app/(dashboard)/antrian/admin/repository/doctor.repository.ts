import { serverFetch } from "@/common/helpers/serverFetch";
import { IEmployee } from "@/common/models/employee.model";
import { IResponse } from "@/common/models/response.model";
import { BASE_URL } from "@/common/repository/api";

const EMPLOYEE_API_URL = `${BASE_URL}/users`;

export async function getAllDoctors(): Promise<IResponse<IEmployee[]>> {
  try {
    const url = new URL(EMPLOYEE_API_URL);

    url.searchParams.append("search", "dr");

    const res = await serverFetch<IResponse<IEmployee[]>>(url.toString(), {
      method: "GET",
    });

    return res;
  } catch (error) {
    return { error: (error as Error).message };
  }
}
