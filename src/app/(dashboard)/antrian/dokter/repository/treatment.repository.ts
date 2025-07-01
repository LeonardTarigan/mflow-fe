"use server";

import { serverFetch } from "@/common/helpers/serverFetch";
import { IResponse } from "@/common/models/response.model";
import {
  IAddCareSessionTreatmentPayload,
  ICareSessionTreatment,
} from "@/common/models/treatment.model";
import { BASE_URL } from "@/common/repository/api";

const TREATMENT_API_URL = `${BASE_URL}/treatments`;

export async function addSessionTreatment(
  payload: IAddCareSessionTreatmentPayload,
) {
  try {
    const res = await serverFetch<IResponse<ICareSessionTreatment[]>>(
      TREATMENT_API_URL + "/sessions",
      {
        method: "POST",
        body: JSON.stringify(payload),
      },
    );

    return res;
  } catch (error) {
    return { error: (error as Error).message };
  }
}
