"use server";

import { serverFetch } from "@/common/helpers/serverFetch";
import { IResponse } from "@/common/models/response.model";
import {
  TAddTreatmentPayload,
  TTreatment,
  TUpdateTreatmentPayload,
} from "@/common/models/treatment.model";
import { BASE_URL } from "@/common/repository/api";

const TREATMENT_API_URL = `${BASE_URL}/treatments`;

export async function getAllTreatments(
  pageSize?: number,
  page = 1,
  search?: string,
): Promise<IResponse<TTreatment[]>> {
  try {
    const url = new URL(TREATMENT_API_URL);

    url.searchParams.append("page", page.toString());
    if (pageSize) url.searchParams.append("pageSize", pageSize.toString());
    if (search) url.searchParams.append("search", search);

    const res = await serverFetch<IResponse<TTreatment[]>>(url.toString(), {
      method: "GET",
    });

    return res;
  } catch (error) {
    return { error: (error as Error).message };
  }
}

export async function addTreatment(payload: TAddTreatmentPayload) {
  try {
    const res = await serverFetch<IResponse<TTreatment>>(TREATMENT_API_URL, {
      method: "POST",
      body: JSON.stringify(payload),
    });

    return res;
  } catch (error) {
    return { error: (error as Error).message };
  }
}

export async function updateTreatment(
  id: number,
  payload: TUpdateTreatmentPayload,
) {
  try {
    const res = await serverFetch<IResponse<TTreatment>>(
      `${TREATMENT_API_URL}/${id}`,
      {
        method: "PATCH",
        body: JSON.stringify(payload),
      },
    );

    return res;
  } catch (error) {
    return { error: (error as Error).message };
  }
}

export async function deleteTreatment(id: number) {
  try {
    const res = await serverFetch<IResponse<string>>(
      `${TREATMENT_API_URL}/${id}`,
      {
        method: "DELETE",
      },
    );

    return res;
  } catch (error) {
    return { error: (error as Error).message };
  }
}
