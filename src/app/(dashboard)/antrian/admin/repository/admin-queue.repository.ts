"use server";

import { serverFetch } from "@/common/helpers/serverFetch";
import { ICareHistory } from "@/common/models/care-history.model";
import { IAddQueuePayload, IQueue } from "@/common/models/queue.model";
import { IResponse } from "@/common/models/response.model";
import { BASE_URL } from "@/common/repository/api";

const QUEUE_API_URL = `${BASE_URL}/queues`;

export async function getActiveQueues(
  pageSize?: number,
  page = 1,
): Promise<IResponse<ICareHistory[]>> {
  try {
    const url = new URL(QUEUE_API_URL);

    url.searchParams.append("page", page.toString());
    if (pageSize) url.searchParams.append("pageSize", pageSize.toString());

    const res = await serverFetch<IResponse<ICareHistory[]>>(url.toString(), {
      method: "GET",
    });

    return res;
  } catch (error) {
    return { error: (error as Error).message };
  }
}

export async function addQueue(payload: IAddQueuePayload) {
  try {
    const res = await serverFetch<IResponse<IQueue>>(QUEUE_API_URL, {
      method: "POST",
      body: JSON.stringify(payload),
    });

    return res;
  } catch (error) {
    return { error: (error as Error).message };
  }
}
