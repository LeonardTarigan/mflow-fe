import type { RefAttributes, TdHTMLAttributes } from "react";
import { TableCell, TableRow } from "./table";
import GifNotFound from "../gif/not-found-gif";

export default function EmptyDataState(
  props?: TdHTMLAttributes<HTMLTableCellElement> &
    RefAttributes<HTMLTableCellElement>
) {
  return (
    <TableRow className="border-none hover:bg-white">
      <TableCell {...props}>
        <div className="flex w-full flex-col items-center justify-center gap-2 py-5">
          <GifNotFound />
          <p className="text-neutral-400">Tidak ada data yang ditemukan!</p>
        </div>
      </TableCell>
    </TableRow>
  );
}
