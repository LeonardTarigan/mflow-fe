"use server";

import { serverFetch } from "@/common/helpers/serverFetch";
import { ICareHistory } from "@/common/models/care-history.model";
import { IResponse } from "@/common/models/response.model";
import { BASE_URL } from "@/common/repository/api";

const HISTORY = `${BASE_URL}/queues`;

export async function getAllCareHistory(
  pageSize?: number,
  page = 1,
): Promise<IResponse<ICareHistory[]>> {
  try {
    const url = new URL(HISTORY);

    url.searchParams.append("page", page.toString());
    url.searchParams.append("isQueueActive", "false");
    if (pageSize) url.searchParams.append("pageSize", pageSize.toString());

    const res = await serverFetch<IResponse<ICareHistory[]>>(url.toString(), {
      method: "GET",
    });

    return res;
  } catch (error) {
    return { error: (error as Error).message };
  }
}
