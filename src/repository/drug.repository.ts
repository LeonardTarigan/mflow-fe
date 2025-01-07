"use server";

import { useFetch } from "@/hooks/shared/useFetch";
import type { IResponse } from "@/model/common.model";
import type {
  IAddDrugPayload,
  IDrug,
  IUpdateDrugPayload,
} from "@/model/drug.model";
import { DRUG_API_URL } from "./api";

export async function getAllDrugs(
  page = 1,
  search?: string,
): Promise<IResponse<IDrug[]>> {
  try {
    const url = new URL(DRUG_API_URL);

    url.searchParams.append("page", page.toString());

    if (search) {
      url.searchParams.append("search", search);
    }

    const res = await useFetch<IResponse<IDrug[]>>(url.toString(), {
      method: "GET",
    });

    return res;
  } catch (error) {
    return { error: (error as Error).message };
  }
}

export async function addDrug(payload: IAddDrugPayload) {
  try {
    const res = await useFetch<IResponse<IDrug>>(DRUG_API_URL, {
      method: "POST",
      body: JSON.stringify(payload),
    });

    return res;
  } catch (error) {
    return { error: (error as Error).message };
  }
}

export async function updateDrug(id: number, payload: IUpdateDrugPayload) {
  try {
    const res = await useFetch<IResponse<IDrug>>(`${DRUG_API_URL}/${id}`, {
      method: "PATCH",
      body: JSON.stringify(payload),
    });

    return res;
  } catch (error) {
    return { error: (error as Error).message };
  }
}

export async function deleteDrug(id: number) {
  try {
    const res = await useFetch<IResponse<string>>(`${DRUG_API_URL}/${id}`, {
      method: "DELETE",
    });

    return res;
  } catch (error) {
    return { error: (error as Error).message };
  }
}
