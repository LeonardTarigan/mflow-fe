import type { RefAttributes, TdHTMLAttributes } from "react";
import { TableCell, TableRow } from "./table";
import GifNotFound from "./gif-not-found";

export default function EmptyTableState(
  props?: TdHTMLAttributes<HTMLTableCellElement> &
    RefAttributes<HTMLTableCellElement>,
) {
  return (
    <TableRow>
      <TableCell {...props}>
        <div className="flex w-full flex-col items-center justify-center gap-2 py-5">
          <GifNotFound />
          <p className="text-neutral-400">Tidak ada data yang ditemukan!</p>
        </div>
      </TableCell>
    </TableRow>
  );
}
