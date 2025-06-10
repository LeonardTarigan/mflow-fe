"use server";

import { serverFetch } from "@/common/helpers/serverFetch";
import { ICareHistory } from "@/common/models/care-history.model";
import {
  IAddQueuePayload,
  IQueue,
  IUpdateQueuePayload,
} from "@/common/models/queue.model";
import { IResponse } from "@/common/models/response.model";
import { BASE_URL } from "@/common/repository/api";

const QUEUE_API_URL = `${BASE_URL}/queues`;

export async function getActiveQueues(roomId?: string): Promise<IResponse<ICareHistory[]>> {
  try {
    const url = new URL(QUEUE_API_URL);
    if (roomId) {
      url.searchParams.set("roomId", roomId);
    }

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

export async function updateQueue(id: number, payload: IUpdateQueuePayload) {
  try {
    const res = await serverFetch<IResponse<IQueue>>(`${QUEUE_API_URL}/${id}`, {
      method: "PATCH",
      body: JSON.stringify(payload),
    });

    return res;
  } catch (error) {
    return { error: (error as Error).message };
  }
}
