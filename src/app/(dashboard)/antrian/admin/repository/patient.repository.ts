"use server";

import { serverFetch } from "@/common/helpers/serverFetch";
import { IPatient } from "@/common/models/patient.model";
import { IResponse } from "@/common/models/response.model";
import { BASE_URL } from "@/common/repository/api";

const PATIENT_API_URL = `${BASE_URL}/patients`;

export async function getPatientByMrNumber(
  mrNumber: string,
): Promise<IResponse<IPatient>> {
  try {
    const res = await serverFetch<IResponse<IPatient>>(
      `${PATIENT_API_URL}/${mrNumber}`,
      {
        method: "GET",
      },
    );

    return res;
  } catch (error) {
    return { error: (error as Error).message };
  }
}
