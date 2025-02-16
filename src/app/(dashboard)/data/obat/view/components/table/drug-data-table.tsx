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
import { IDrug } from "@/common/models/drug.model";
import { IGeneralFilter, IResponse } from "@/common/models/response.model";
import type { Dispatch, SetStateAction } from "react";
import DrugDataTableContent from "./drug-data-table-content";
import TableRowLoadingSkeleton from "@/common/components/table/table-row-loading-skeleton";

interface IDrugDataTable {
  data: IResponse<IDrug[]> | undefined;
  isLoading: boolean;
  onPageChange: Dispatch<SetStateAction<IGeneralFilter>>;
}

export default function DrugDataTable({
  data,
  isLoading,
  onPageChange,
}: IDrugDataTable) {
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
          <TableHead>Nama</TableHead>
          <TableHead>Jumlah Terjual</TableHead>
          <TableHead>Unit</TableHead>
          <TableHead>Harga</TableHead>
          <TableHead>Action</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {isLoading && <TableRowLoadingSkeleton column={6} />}
        <DrugDataTableContent
          current_page={current_page || 0}
          data={data?.data}
        />
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell colSpan={7}>
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
