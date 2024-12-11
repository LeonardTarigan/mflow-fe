import type { IGeneralFilter, IResponse } from "@/model/general-types";
import type { Dispatch, SetStateAction } from "react";
import TablePagination from "../shared/pagination";
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "../shared/table";

import { formatToRupiah } from "@/lib/helpers/formatToRupiah";
import type { IHistory } from "@/model/history-types";
import EmptyDataState from "../shared/empty-data-state";

interface ITableHistory {
  data: IResponse<IHistory[]> | undefined;
  isLoading: boolean;
  onPageChange: Dispatch<SetStateAction<IGeneralFilter>>;
}

export default function TableHistory({
  data,
  isLoading,
  onPageChange,
}: ITableHistory) {
  if (isLoading)
    return (
      <div className="aspect-video w-full animate-pulse rounded-xl bg-neutral-200" />
    );

  if (!data?.data || !data?.pagination) return;

  const { current, total, prev, next } = data.pagination;

  return (
    <Table className="bg-white">
      <TableHeader>
        <TableRow>
          <TableHead>No.</TableHead>
          <TableHead>Admin</TableHead>
          <TableHead>Pasien</TableHead>
          <TableHead>Dokter</TableHead>
          <TableHead>Tanggal</TableHead>
          <TableHead>Ruangan</TableHead>
          <TableHead className="whitespace-nowrap">Total Harga</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.data.length === 0 && <EmptyDataState colSpan={7} />}
        {data.data.map(
          (
            { id, timestamp, admin, doctor, patient, room, total_price },
            index,
          ) => (
            <TableRow key={id}>
              <TableCell className="font-medium">
                {(current - 1) * 10 + (index + 1)}
              </TableCell>
              <TableCell>{admin.name}</TableCell>
              <TableCell>{patient.name}</TableCell>
              <TableCell>{doctor.name}</TableCell>
              <TableCell>{timestamp}</TableCell>
              <TableCell>{room}</TableCell>
              <TableCell className="whitespace-nowrap">
                {formatToRupiah(total_price)}
              </TableCell>
            </TableRow>
          ),
        )}
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell colSpan={8}>
            <div className="flex items-center justify-end">
              <TablePagination
                {...{ prev, next, current, total, onPageChange }}
              />
            </div>
          </TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  );
}
