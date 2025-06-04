import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/common/components/table/table";
import TablePagination from "@/common/components/table/table-pagination";
import TableRowLoadingSkeleton from "@/common/components/table/table-row-loading-skeleton";
import { IPatient } from "@/common/models/patient.model";
import { IGeneralFilter, IResponse } from "@/common/models/response.model";
import type { Dispatch, SetStateAction } from "react";
import PatientDataTableContent from "./patient-data-table-content";

interface IPatientDataTable {
  data: IResponse<IPatient[]> | undefined;
  isLoading: boolean;
  onPageChange: Dispatch<SetStateAction<IGeneralFilter>>;
}

export default function PatientDataTable({
  data,
  isLoading,
  onPageChange,
}: IPatientDataTable) {
  const {
    previous_page = null,
    next_page = null,
    current_page = 0,
    total_page = 0,
    total_data = 0,
  } = data?.meta || {};

  return (
    <Table className="bg-white">
      <TableHeader>
        <TableRow>
          <TableHead>No.</TableHead>
          <TableHead className="min-w-[100px]">No. MR</TableHead>
          <TableHead>Nama</TableHead>
          <TableHead>NIK</TableHead>
          <TableHead className="min-w-[150px]">Tanggal Lahir</TableHead>
          <TableHead className="min-w-[150px]">Jenis Kelamin</TableHead>
          <TableHead className="min-w-[150px]">Alamat</TableHead>
          <TableHead>Pekerjaan</TableHead>
          <TableHead>No. Telepon</TableHead>
          <TableHead>Email</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {isLoading && <TableRowLoadingSkeleton column={10} />}
        <PatientDataTableContent
          current_page={current_page || 0}
          data={data?.data}
        />
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell colSpan={10}>
            <div className="flex items-center justify-between">
              <p className="text-base font-normal">
                Total <span className="font-bold">{total_data || 0}</span> obat
              </p>
              <TablePagination
                {...{
                  previous_page,
                  next_page,
                  current_page,
                  total_page,
                  total_data,
                  onPageChange,
                }}
              />
            </div>
          </TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  );
}
