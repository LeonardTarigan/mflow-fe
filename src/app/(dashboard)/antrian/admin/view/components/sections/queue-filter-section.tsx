import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/common/components/select/select";
import QueueScreenButton from "../buttons/queue-screen-button";
import AddQueueModal from "../modals/add-queue-modal";
import useQueryRooms from "../../../hooks/useQueryRoom";
import useQueueRoomFilter from "../../../hooks/useQueueRoomFilter";

export default function QueueFilterSection() {
  const { res: roomData } = useQueryRooms();
  const roomList = roomData.data?.data;

  const { selectedRoomId, setRoomId } = useQueueRoomFilter();

  return (
    <section className="sticky top-0 h-fit w-full space-y-5 divide-y rounded-xl bg-white p-5">
      <div className="space-y-4">
        <h3 className="mb-4 text-xl font-bold">Filter Antrian</h3>
        <div className="space-y-1">
          <p className="text-sm font-semibold">Ruangan</p>
          <Select
            value={selectedRoomId}
            onValueChange={setRoomId}
            defaultValue=""
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Pilih Ruangan" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="0">Semua Ruangan</SelectItem>
              {roomList?.map((room) => (
                <SelectItem key={room.id} value={String(room.id)}>
                  {room.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
      <div className="space-y-2 pt-5">
        <AddQueueModal />
        <QueueScreenButton />
      </div>
    </section>
  );
}
