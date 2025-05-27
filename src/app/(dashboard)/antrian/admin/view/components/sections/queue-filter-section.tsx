import { Button } from "@/common/components/button/button";
import { Progress } from "@/common/components/progress/progress";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/common/components/select/select";
import { PlayIcon, PlusIcon } from "lucide-react";
import QueueScreenButton from "../buttons/queue-screen-button";

export default function QueueFilterSection() {
  return (
    <section className="sticky top-0 h-fit w-full space-y-5 divide-y rounded-xl bg-white p-5">
      <div className="space-y-4">
        <h3 className="mb-4 text-xl font-bold">Filter Antrian</h3>
        <div className="space-y-1">
          <p className="text-sm font-semibold">Ruangan</p>
          <Select defaultValue="all">
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Pilih Ruangan" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Semua Ruangan</SelectItem>
              <SelectItem value="light">Poli Umum 1</SelectItem>
              <SelectItem value="dark">Poli Umum 2</SelectItem>
              <SelectItem value="system">Poli Gigi</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-1">
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
        </div>

        <div className="pt-5">
          <div className="mb-1 flex justify-between gap-2 text-sm font-semibold">
            <p>Antrian Selesai</p>
            <p>20/46</p>
          </div>
          <Progress value={70} className="h-2" />
        </div>
      </div>
      <div className="space-y-2 pt-5">
        <Button className="w-full">
          <PlusIcon />
          <span>Tambah Antrian</span>
        </Button>
        <Button variant={"outline"} className="w-full">
          <PlayIcon />
          <span>Lanjut Antrian</span>
        </Button>
        <QueueScreenButton />
      </div>
    </section>
  );
}
