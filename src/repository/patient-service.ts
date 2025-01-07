import type { IResponse } from "@/model/common.model";
import type { IPatient } from "@/model/patient-types";
import patientData from "@/repository/dummy/patient-data.json";

class PatientService {
  public getAllPatients(
    query?: Record<string, unknown>,
  ): IResponse<IPatient[]> {
    let filteredData: IPatient[] = patientData as IPatient[];

    if (query?.search) {
      filteredData = filteredData.filter((drug) =>
        drug.name
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

export const PatientAPI = new PatientService();
