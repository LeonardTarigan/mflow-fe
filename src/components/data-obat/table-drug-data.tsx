import { formatToRupiah } from "@/lib/helpers/formatToRupiah";
import type { IDrug, IDrugFilter } from "@/model/drug-types";
import type { IResponse } from "@/model/general-types";
import type { Dispatch, SetStateAction } from "react";
import EmptyTableState from "../shared/empty-table-state";
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "../shared/table";
import ModalDeleteDrug from "./modal-delete-drug";
import ModalEditDrug from "./modal-edit-drug";
import TablePagination from "../shared/pagination";

interface ITableDrugData {
  data: IResponse<IDrug[]> | undefined;
  isLoading: boolean;
  onPageChange: Dispatch<SetStateAction<IDrugFilter>>;
}

export default function TableDrugData({
  data,
  isLoading,
  onPageChange,
}: ITableDrugData) {
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
          <TableHead>Nama</TableHead>
          <TableHead>Kategori</TableHead>
          <TableHead>Jumlah</TableHead>
          <TableHead>Unit</TableHead>
          <TableHead>Harga</TableHead>
          <TableHead>Action</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.data.length === 0 && <EmptyTableState colSpan={7} />}
        {data.data.map(
          ({ id, name, category, price, quantity, unit }, index) => (
            <TableRow key={id}>
              <TableCell className="font-medium">
                {(current - 1) * 10 + (index + 1)}
              </TableCell>
              <TableCell>{name}</TableCell>
              <TableCell>{category}</TableCell>
              <TableCell>{quantity}</TableCell>
              <TableCell>{unit}</TableCell>
              <TableCell>{formatToRupiah(price ?? 0)}</TableCell>
              <TableCell className="space-x-2">
                <ModalEditDrug
                  defaultValues={{ name, category, price, quantity, unit }}
                />
                <ModalDeleteDrug id={id} name={name} />
              </TableCell>
            </TableRow>
          ),
        )}
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell colSpan={7}>
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
