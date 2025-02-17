"use server";

import { serverFetch } from "@/common/helpers/serverFetch";
import { IResponse } from "@/common/models/response.model";
import { BASE_URL } from "@/common/repository/api";
import {
  TAddRoomPayload,
  TRoom,
  TUpdateRoomPayload,
} from "../model/room.model";

const ROOM_API_URL = `${BASE_URL}/rooms`;

export async function getAllRooms(
  pageSize?: number,
  page = 1,
  search?: string,
): Promise<IResponse<TRoom[]>> {
  try {
    const url = new URL(ROOM_API_URL);

    url.searchParams.append("page", page.toString());
    if (pageSize) url.searchParams.append("pageSize", pageSize.toString());
    if (search) url.searchParams.append("search", search);

    const res = await serverFetch<IResponse<TRoom[]>>(url.toString(), {
      method: "GET",
    });

    return res;
  } catch (error) {
    return { error: (error as Error).message };
  }
}

export async function addRoom(payload: TAddRoomPayload) {
  try {
    const res = await serverFetch<IResponse<TRoom>>(ROOM_API_URL, {
      method: "POST",
      body: JSON.stringify(payload),
    });

    return res;
  } catch (error) {
    return { error: (error as Error).message };
  }
}

export async function updateRoom(id: number, payload: TUpdateRoomPayload) {
  try {
    const res = await serverFetch<IResponse<TRoom>>(`${ROOM_API_URL}/${id}`, {
      method: "PATCH",
      body: JSON.stringify(payload),
    });

    return res;
  } catch (error) {
    return { error: (error as Error).message };
  }
}

export async function deleteRoom(id: number) {
  try {
    const res = await serverFetch<IResponse<string>>(`${ROOM_API_URL}/${id}`, {
      method: "DELETE",
    });

    return res;
  } catch (error) {
    return { error: (error as Error).message };
  }
}
