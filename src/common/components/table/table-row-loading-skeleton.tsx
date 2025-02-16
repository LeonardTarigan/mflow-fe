import { TableCell, TableRow } from "./table";

interface ITableRowLoadingSkeleton {
  row?: number;
  column: number;
}

export default function TableRowLoadingSkeleton({
  row = 10,
  column,
}: ITableRowLoadingSkeleton) {
  return [...Array(row)].map((_, index) => (
    <TableRow key={index}>
      {[...Array(column)].map(() => (
        <TableCell key={index + 10}>
          <div className="h-5 w-full animate-pulse rounded bg-neutral-200"></div>
        </TableCell>
      ))}
    </TableRow>
  ));
}
