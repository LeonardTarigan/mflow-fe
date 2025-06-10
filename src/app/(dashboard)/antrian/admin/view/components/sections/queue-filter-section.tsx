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
        {/* <div className="space-y-1">
          <p className="text-sm font-semibold">Status</p>
          <Select defaultValue="all">
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Pilih Status" />
            </SelectTrigger>
            <SelectContent className="w-full">
              <SelectItem value="all">Semua Status (34)</SelectItem>
              <SelectItem value="1">Menunggu Konsultasi (6)</SelectItem>
              <SelectItem value="2">Sedang Konsultasi (12)</SelectItem>
              <SelectItem value="3">Menunggu Obat (12)</SelectItem>
              <SelectItem value="4">Menunggu Pembayaran (12)</SelectItem>
              <SelectItem value="5">Selesai (12)</SelectItem>
            </SelectContent>
          </Select>
        </div> */}

        {/* <div className="pt-5">
          <div className="mb-1 flex justify-between gap-2 text-sm font-semibold">
            <p>Antrian Selesai</p>
            <p>20/46</p>
          </div>
          <Progress value={70} className="h-2" />
        </div> */}
      </div>
      <div className="space-y-2 pt-5">
        <AddQueueModal />
        <QueueScreenButton />
      </div>
    </section>
  );
}
