"use server";

import { serverFetch } from "@/common/helpers/serverFetch";
import { IPatient } from "@/common/models/patient.model";
import { IResponse } from "@/common/models/response.model";
import { BASE_URL } from "@/common/repository/api";

const PATIENT_API_URL = `${BASE_URL}/patients`;

export async function getAllPatients(
  pageSize?: number,
  page = 1,
  search?: string,
): Promise<IResponse<IPatient[]>> {
  try {
    const url = new URL(PATIENT_API_URL);

    url.searchParams.append("page", page.toString());
    if (pageSize) url.searchParams.append("pageSize", pageSize.toString());
    if (search) url.searchParams.append("search", search);

    const res = await serverFetch<IResponse<IPatient[]>>(url.toString(), {
      method: "GET",
    });

    return res;
  } catch (error) {
    return { error: (error as Error).message };
  }
}
