"use server";

import { serverFetch } from "@/common/helpers/serverFetch";
import { IResponse } from "@/common/models/response.model";
import { BASE_URL } from "@/common/repository/api";
import { IDiagnosis } from "../hooks/useManageDiagnoses";
import { IAddSessionDiagnosisPayload } from "@/common/models/diagnosis.model";

const DIAGNOSIS_API_URL = `${BASE_URL}/diagnoses`;

export async function getAllDiagnoses(
  query?: string,
): Promise<IResponse<IDiagnosis[]>> {
  try {
    const url = new URL(DIAGNOSIS_API_URL);

    if (query) {
      url.searchParams.append("query", query.toString());
    }

    const res = await serverFetch<IResponse<IDiagnosis[]>>(url.toString(), {
      method: "GET",
    });

    return res;
  } catch (error) {
    return { error: (error as Error).message };
  }
}

export async function addSessionDiagnosis(
  payload: IAddSessionDiagnosisPayload,
) {
  try {
    const res = await serverFetch<IResponse<IDiagnosis[]>>(
      DIAGNOSIS_API_URL + "/sessions",
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
