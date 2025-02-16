import EmptyDataState from "@/common/components/table/empty-data-state";
import { TableCell, TableRow } from "@/common/components/table/table";
import formatToRupiah from "@/common/helpers/formatToRupiah";
import { IDrug } from "@/common/models/drug.model";
import DeleteDrugModal from "../modal/delete-drug-modal";
import UpdateDrugModal from "../modal/update-drug-modal";

export default function DrugDataTableContent({
  data,
  current_page,
}: {
  data: IDrug[] | undefined;
  current_page: number;
}) {
  if (!data) return;

  return (
    <>
      {data.length === 0 && <EmptyDataState colSpan={7} />}
      {data.map(({ id, name, price, unit, amount_sold }, index) => (
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
    </>
  );
}
