import type { IResponse } from "@/model/general-types";
import type { IHistory } from "@/model/history-types";
import istoryData from "@/repository/dummy/history-data.json";

class HistoryService {
  public getAllHistory(query?: Record<string, unknown>): IResponse<IHistory[]> {
    let filteredData: IHistory[] = istoryData as IHistory[];

    if (query?.search) {
      filteredData = filteredData.filter((history) =>
        history.patient.name
          .toLowerCase()
          .includes((query.search as string).toLowerCase()),
      );
    }

    const page = (query?.page as number) || 1;
    const pageSize = (query?.pageSize as number) || 10;
    const totalItems = filteredData.length;
    const totalPages = Math.ceil(totalItems / pageSize);
    const start = (page - 1) * pageSize;
    const end = start + pageSize;

    const paginatedData = filteredData.slice(start, end);

    return {
      data: paginatedData,
      pagination: {
        prev: page > 1 ? page - 1 : null,
        next: page < totalPages ? page + 1 : null,
        current: page,
        total: totalPages,
      },
    };
  }
}

export const HistoryAPI = new HistoryService();
