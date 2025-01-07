import type { IDrug } from "@/model/drug-types";
import type { IResponse } from "@/model/common.model";
import drugData from "@/repository/dummy/drug-data.json"; // Import dummy JSON data

class DrugService {
  public getAllDrugs(query?: Record<string, unknown>): IResponse<IDrug[]> {
    let filteredData: IDrug[] = drugData;

    if (query?.search) {
      filteredData = filteredData.filter(
        (drug) =>
          drug.name
            .toLowerCase()
            .includes((query.search as string).toLowerCase()) ||
          drug.category
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

export const DrugAPI = new DrugService();
