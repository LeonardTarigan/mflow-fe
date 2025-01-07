import { formatToRupiah } from "@/lib/helpers/formatToRupiah";
import type { IGeneralFilter, IResponse } from "@/model/common.model";
import type { IDrug } from "@/model/drug.model";
import type { Dispatch, SetStateAction } from "react";
import EmptyDataState from "../shared/empty-data-state";
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
import ModalDeleteDrug from "./modal-delete-drug";
import ModalUpdateDrug from "./modal-update-drug";

interface ITableDrugData {
  data: IResponse<IDrug[]> | undefined;
  isLoading: boolean;
  onPageChange: Dispatch<SetStateAction<IGeneralFilter>>;
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

  if (!data?.data || !data?.meta) return;

  const { current_page, total_page, total_data, previous_page, next_page } =
    data.meta;

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
        {data.data.length === 0 && <EmptyDataState colSpan={7} />}
        {data.data.map(({ id, name, price, unit, amount_sold }, index) => (
          <TableRow key={id}>
            <TableCell className="font-medium">
              {(current_page - 1) * 10 + (index + 1)}
            </TableCell>
            <TableCell>{name}</TableCell>
            <TableCell>{amount_sold}</TableCell>
            <TableCell>{unit}</TableCell>
            <TableCell>{formatToRupiah(price ?? 0)}</TableCell>
            <TableCell className="flex items-center space-x-1">
              <ModalUpdateDrug id={id} defaultValues={{ name, price, unit }} />
              <ModalDeleteDrug id={id} name={name} />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell colSpan={7}>
            <div className="flex items-center justify-end">
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
