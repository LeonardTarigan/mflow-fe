import EmptyDataState from "@/common/components/table/empty-data-state";
import { TableCell, TableRow } from "@/common/components/table/table";
import { TRoom } from "../../../model/room.model";
import DeleteRoomModal from "../modal/delete-room-modal";
import UpdateRoomModal from "../modal/update-room-modal";

export default function RoomDataTableContent({
  data,
  current_page,
}: {
  data: TRoom[] | undefined;
  current_page: number;
}) {
  if (!data) return;

  return (
    <>
      {data.length === 0 && <EmptyDataState colSpan={7} />}
      {data.map(({ id, name }, index) => (
        <TableRow key={id}>
          <TableCell className="font-medium">
            {(current_page - 1) * 10 + (index + 1)}
          </TableCell>
          <TableCell>{name}</TableCell>
          <TableCell className="flex items-center space-x-1">
            <UpdateRoomModal id={id} defaultValues={{ name }} />
            <DeleteRoomModal id={id} name={name} />
          </TableCell>
        </TableRow>
      ))}
    </>
  );
}
