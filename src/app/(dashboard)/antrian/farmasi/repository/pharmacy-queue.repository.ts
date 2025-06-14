"use server";

import { serverFetch } from "@/common/helpers/serverFetch";
import { IPharmacyQueue } from "@/common/models/queue.model";
import { IResponse } from "@/common/models/response.model";
import { BASE_URL } from "@/common/repository/api";

const PHARMACY_QUEUE_API_URL = `${BASE_URL}/queues/pharmacy`;

export async function getActivePharmacyQueues(): Promise<
  IResponse<IPharmacyQueue>
> {
  try {
    const url = new URL(PHARMACY_QUEUE_API_URL);

    const res = await serverFetch<IResponse<IPharmacyQueue>>(url.toString(), {
      method: "GET",
    });

    return res;
  } catch (error) {
    return { error: (error as Error).message };
  }
}
