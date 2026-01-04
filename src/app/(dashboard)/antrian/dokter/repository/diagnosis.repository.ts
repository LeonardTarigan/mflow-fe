"use server";

import { serverFetch } from "@/common/helpers/serverFetch";
import { IResponse } from "@/common/models/response.model";
import { BASE_URL, ICD_API_BASE_URL } from "@/common/repository/api";
import {
  IAddSessionDiagnosisPayload,
  IDeleteSessionDiagnosisPaylaod,
  IDiagnosis,
} from "@/common/models/diagnosis.model";

const DIAGNOSIS_API_URL = `${BASE_URL}/diagnoses`;
const SESSION_DIAGNOSIS_API_URL = `${BASE_URL}/session-diagnosis`;

export async function getAllDiagnoses(
  query?: string,
): Promise<IResponse<IDiagnosis[]>> {
  try {
    const url = new URL(DIAGNOSIS_API_URL);
    const icdApiUrl = new URL(ICD_API_BASE_URL!);

    icdApiUrl.searchParams.append("sf", "code,name");

    if (query) {
      url.searchParams.append("query", query.toString());
      icdApiUrl.searchParams.append("terms", query.toString());
    }

    const [res, icdRes] = await Promise.all([
      serverFetch<IResponse<IDiagnosis[]>>(url.toString(), { method: "GET" }),
      serverFetch(icdApiUrl.toString(), { method: "GET" }),
    ]);

    const icdList: IDiagnosis[] = Array.isArray(icdRes)
      ? icdRes[3].map((item: [string, string]) => ({
          id: item[0],
          name: item[1],
          type: "external",
        }))
      : [];

    const resIds = new Set((res.data ?? []).map((d) => d.id));
    const filteredIcdList = icdList.filter((d) => !resIds.has(d.id));

    const combined: IDiagnosis[] = [...(res.data ?? []), ...filteredIcdList];

    const resCombined = combined.map((d) => ({
      ...d,
    }));

    return { ...res, data: resCombined };
  } catch (error) {
    return { error: (error as Error).message };
  }
}

export async function addSessionDiagnosis(
  payload: IAddSessionDiagnosisPayload,
) {
  try {
    const res = await serverFetch<IResponse<IDiagnosis>>(
      SESSION_DIAGNOSIS_API_URL,
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

export async function deleteSessionDiagnosis(
  payload: IDeleteSessionDiagnosisPaylaod,
) {
  try {
    const res = await serverFetch<IResponse<IDiagnosis>>(
      SESSION_DIAGNOSIS_API_URL,
      {
        method: "DELETE",
        body: JSON.stringify(payload),
      },
    );

    return res;
  } catch (error) {
    return { error: (error as Error).message };
  }
}
