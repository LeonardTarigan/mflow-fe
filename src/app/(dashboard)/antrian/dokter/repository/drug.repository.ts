"use server";

import { serverFetch } from "@/common/helpers/serverFetch";
import {
  IAddSessionDrugOrderPayload,
  IDrugOrder,
} from "@/common/models/drug.model";
import { IResponse } from "@/common/models/response.model";
import { BASE_URL } from "@/common/repository/api";

const DRUG_ORDER_API_URL = `${BASE_URL}/drug-orders`;

export async function addSessionDrugOrder(
  payload: IAddSessionDrugOrderPayload,
) {
  try {
    const res = await serverFetch<IResponse<IDrugOrder[]>>(DRUG_ORDER_API_URL, {
      method: "POST",
      body: JSON.stringify(payload),
    });

    return res;
  } catch (error) {
    return { error: (error as Error).message };
  }
}
