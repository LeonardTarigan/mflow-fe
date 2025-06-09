"use server";

import { serverFetch } from "@/common/helpers/serverFetch";
import {
  IAddSessionVitalSignPayload,
  IVitalSignDetail,
} from "@/common/models/queue.model";
import { IResponse } from "@/common/models/response.model";
import { BASE_URL } from "@/common/repository/api";

const VITAL_SIGN_API_URL = `${BASE_URL}/vital-signs`;

export async function addVitalSign(payload: IAddSessionVitalSignPayload) {
  try {
    const res = await serverFetch<IResponse<IVitalSignDetail>>(
      VITAL_SIGN_API_URL,
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
