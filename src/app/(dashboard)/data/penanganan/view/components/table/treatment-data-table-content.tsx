import EmptyDataState from "@/common/components/table/empty-data-state";
import { TableCell, TableRow } from "@/common/components/table/table";
import { TTreatment } from "@/common/models/treatment.model";
import UpdateTreatmentModal from "../modal/update-treatment-modal";
import DeleteTreatmentModal from "../modal/delete-treatment-modal";
import formatToRupiah from "@/common/helpers/formatToRupiah";

export default function TreatmentDataTableContent({
  data,
  current_page,
}: {
  data: TTreatment[] | undefined;
  current_page: number;
}) {
  if (!data) return;

  return (
    <>
      {data.length === 0 && <EmptyDataState colSpan={7} />}
      {data.map(({ id, name, price }, index) => (
        <TableRow key={id}>
          <TableCell className="font-medium">
            {(current_page - 1) * 10 + (index + 1)}
          </TableCell>
          <TableCell>{name}</TableCell>
          <TableCell>{formatToRupiah(price)}</TableCell>
          <TableCell className="flex items-center space-x-1">
            <UpdateTreatmentModal id={id} defaultValues={{ name, price }} />
            <DeleteTreatmentModal id={id} name={name} />
          </TableCell>
        </TableRow>
      ))}
    </>
  );
}
