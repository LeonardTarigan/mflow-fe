import { formatToRupiah } from "@/lib/helpers/formatToRupiah";
import type { IDrug, IDrugFilter } from "@/model/drug-types";
import type { IResponse } from "@/model/general-types";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  ChevronsLeftIcon,
  ChevronsRightIcon,
} from "lucide-react";
import type { Dispatch, SetStateAction } from "react";
import { Button } from "../shared/button";
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
              <TableCell>{formatToRupiah(price)}</TableCell>
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
              <div className="flex items-center gap-1">
                <Button
                  disabled={!prev}
                  onClick={() => onPageChange((p) => ({ ...p, page: 1 }))}
                  size={"icon"}
                  variant={"outline"}
                >
                  <ChevronsLeftIcon size={20} />
                </Button>
                <Button
                  disabled={!prev}
                  onClick={() =>
                    onPageChange((p) => ({ ...p, page: prev ?? 1 }))
                  }
                  size={"icon"}
                  variant={"outline"}
                >
                  <ChevronLeftIcon size={20} />
                </Button>
                <div className="px-5">
                  {current} / {total}
                </div>
                <Button
                  disabled={!next}
                  onClick={() =>
                    onPageChange((p) => ({ ...p, page: next ?? 1 }))
                  }
                  size={"icon"}
                  variant={"outline"}
                >
                  <ChevronRightIcon size={20} />
                </Button>
                <Button
                  disabled={!next}
                  onClick={() => onPageChange((p) => ({ ...p, page: total }))}
                  size={"icon"}
                  variant={"outline"}
                >
                  <ChevronsRightIcon size={20} />
                </Button>
              </div>
            </div>
          </TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  );
}
