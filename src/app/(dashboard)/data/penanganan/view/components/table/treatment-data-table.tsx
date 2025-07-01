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
import { IGeneralFilter, IResponse } from "@/common/models/response.model";
import { TTreatment } from "@/common/models/treatment.model";
import type { Dispatch, SetStateAction } from "react";
import TreatmentDataTableContent from "./treatment-data-table-content";

export default function TreatmentDataTable({
  data,
  isLoading,
  onPageChange,
}: {
  data: IResponse<TTreatment[]> | undefined;
  isLoading: boolean;
  onPageChange: Dispatch<SetStateAction<IGeneralFilter>>;
}) {
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
          <TableHead>Harga</TableHead>
          <TableHead>Action</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {isLoading && <TableRowLoadingSkeleton column={4} />}
        <TreatmentDataTableContent
          current_page={current_page || 0}
          data={data?.data}
        />
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell colSpan={8}>
            <div className="flex items-center justify-between">
              <p className="text-base font-normal">
                Total <span className="font-bold">{total_data || 0}</span>{" "}
                penanganan
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
