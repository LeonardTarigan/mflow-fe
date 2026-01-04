"use server";

import { serverFetch } from "@/common/helpers/serverFetch";
import { IResponse } from "@/common/models/response.model";
import {
  IDailyIncome,
  IGetDailyIncomeQuery,
  IQuickStats,
} from "@/common/models/statistic.model";
import { BASE_URL } from "@/common/repository/api";

const STATISTIC_API_URL = `${BASE_URL}/statistics`;

export async function getTodaysVisit(): Promise<IResponse<IQuickStats>> {
  try {
    const url = new URL(`${STATISTIC_API_URL}/visits`);

    const res = await serverFetch<IResponse<IQuickStats>>(url.toString(), {
      method: "GET",
    });

    return res;
  } catch (error) {
    return { error: (error as Error).message };
  }
}

export async function getTotalRegistredPatient(): Promise<
  IResponse<IQuickStats>
> {
  try {
    const url = new URL(`${STATISTIC_API_URL}/patients/total`);

    const res = await serverFetch<IResponse<IQuickStats>>(url.toString(), {
      method: "GET",
    });

    return res;
  } catch (error) {
    return { error: (error as Error).message };
  }
}

export async function getTotalNewPatient(): Promise<IResponse<IQuickStats>> {
  try {
    const url = new URL(`${STATISTIC_API_URL}/patients/new`);

    const res = await serverFetch<IResponse<IQuickStats>>(url.toString(), {
      method: "GET",
    });

    return res;
  } catch (error) {
    return { error: (error as Error).message };
  }
}

export async function getDailyIncome({
  startDate,
  endDate,
}: IGetDailyIncomeQuery): Promise<IResponse<IDailyIncome[]>> {
  try {
    const url = new URL(`${STATISTIC_API_URL}/incomes`);
    url.searchParams.set("startDate", startDate.toString());
    url.searchParams.set("endDate", endDate.toString());

    const res = await serverFetch<IResponse<IDailyIncome[]>>(url.toString(), {
      method: "GET",
    });

    return res;
  } catch (error) {
    return { error: (error as Error).message };
  }
}
