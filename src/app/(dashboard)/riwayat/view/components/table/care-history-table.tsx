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
import { ICareHistory } from "@/common/models/care-history.model";
import { IGeneralFilter, IResponse } from "@/common/models/response.model";
import type { Dispatch, SetStateAction } from "react";
import CareHistoryTableContent from "./care-history-table-content";

interface ICareHistoryDataTable {
  data: IResponse<ICareHistory[]> | undefined;
  isLoading: boolean;
  onPageChange: Dispatch<SetStateAction<IGeneralFilter>>;
}

export default function CareHistoryTable({
  data,
  isLoading,
  onPageChange,
}: ICareHistoryDataTable) {
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
          <TableHead className="min-w-[150px]">Tanggal</TableHead>
          <TableHead className="min-w-[150px]">No. Antrian</TableHead>
          <TableHead className="min-w-[150px]">Pasien</TableHead>
          <TableHead className="min-w-[150px]">Dokter</TableHead>
          <TableHead>Ruangan</TableHead>
          <TableHead className="min-w-[200px]">Keluhan</TableHead>
          <TableHead className="min-w-[250px]">Vital Sign</TableHead>
          <TableHead className="min-w-[150px]">Diagnosis</TableHead>
          <TableHead>Status</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {isLoading && <TableRowLoadingSkeleton column={10} />}
        <CareHistoryTableContent
          current_page={current_page || 0}
          data={data?.data}
        />
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell colSpan={10}>
            <div className="flex items-center justify-between">
              <p className="text-base font-normal">
                Total <span className="font-bold">{total_data || 0}</span>{" "}
                pelayanan
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
