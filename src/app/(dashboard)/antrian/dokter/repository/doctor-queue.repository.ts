"use server";

import { serverFetch } from "@/common/helpers/serverFetch";
import { IDoctorQueue } from "@/common/models/queue.model";
import { IResponse } from "@/common/models/response.model";
import { BASE_URL } from "@/common/repository/api";

const DOCTOR_QUEUE_API_URL = `${BASE_URL}/queues/doctor/`;

export async function getActiveDoctorQueues(
  id: string,
): Promise<IResponse<IDoctorQueue>> {
  try {
    const url = new URL(DOCTOR_QUEUE_API_URL + id);

    const res = await serverFetch<IResponse<IDoctorQueue>>(url.toString(), {
      method: "GET",
    });

    return res;
  } catch (error) {
    return { error: (error as Error).message };
  }
}
