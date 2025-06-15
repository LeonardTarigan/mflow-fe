"use server";

import { serverFetch } from "@/common/helpers/serverFetch";
import { IWaitingQueue } from "@/common/models/queue.model";
import { IResponse } from "@/common/models/response.model";
import { BASE_URL } from "@/common/repository/api";

const HISTORY = `${BASE_URL}/queues`;

export async function getAllWaitingQueue(): Promise<
  IResponse<IWaitingQueue[]>
> {
  try {
    const url = new URL(HISTORY);

    url.searchParams.append("status", "WAITING_CONSULTATION");

    const res = await serverFetch<IResponse<IWaitingQueue[]>>(url.toString(), {
      method: "GET",
    });

    return res;
  } catch (error) {
    return { error: (error as Error).message };
  }
}
