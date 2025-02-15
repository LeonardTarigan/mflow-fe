import EmptyDataState from "@/common/components/table/empty-data-state";
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
import formatToRupiah from "@/common/helpers/formatToRupiah";
import { IDrug } from "@/common/models/drug.model";
import { IGeneralFilter, IResponse } from "@/common/models/response.model";
import type { Dispatch, SetStateAction } from "react";
import DeleteDrugModal from "../modal/delete-drug-modal";
import UpdateDrugModal from "../modal/update-drug-modal";

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
              <UpdateDrugModal id={id} defaultValues={{ name, price, unit }} />
              <DeleteDrugModal id={id} name={name} />
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
