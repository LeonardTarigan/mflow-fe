import { User2Icon } from "lucide-react";
import { Button } from "../shared/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../shared/select";
import { Input } from "../shared/input";
import { DatePicker } from "../shared/date-picker";

export default function FormAddQueue() {
  return (
    <form className="space-y-2 rounded-lg bg-white p-5">
      <div className="flex gap-2">
        <Button type="button" variant={"outline"} className="w-full">
          <User2Icon size={20} />
          <span>Ambil Data Pasien Lama</span>
        </Button>
      </div>
      <Input placeholder="NIK" />
      <Input placeholder="Nama" />
      <DatePicker />
      <Input placeholder="Alamat" />
      <Input placeholder="Pekerjaan" />
      <Input placeholder="Nomor Telepon" />
      <Select>
        <SelectTrigger>
          <SelectValue placeholder="Pilih Dokter" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectItem value="1">Dr. Heri Tamba</SelectItem>
            <SelectItem value="2">Dr. Niko</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
      <Select>
        <SelectTrigger>
          <SelectValue placeholder="Pilih Ruangan" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectItem value="1">Poli Umum</SelectItem>
            <SelectItem value="2">Poli Gigi</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
      <div className="flex justify-end gap-1 pt-5">
        <Button type="reset" variant={"outline"}>
          Reset
        </Button>
        <Button type="button">Buat Antrian</Button>
      </div>
    </form>
  );
}
