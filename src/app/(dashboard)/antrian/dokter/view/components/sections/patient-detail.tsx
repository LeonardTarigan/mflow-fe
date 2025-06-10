import { Button } from "@/common/components/button/button";
import { CheckIcon, PlusIcon, TrashIcon } from "lucide-react";

export default function PatientDetail() {
  return (
    <section className="basis-[60%] space-y-5 divide-y rounded-xl bg-white p-5">
      <div className="flex items-center justify-between gap-2">
        <h2 className="text-primary-gradient text-4xl font-black">#U003</h2>
        <Button className="bg-emerald-500 hover:bg-emerald-600">
          <CheckIcon />
          <span>Selesaikan Sesi</span>
        </Button>
      </div>
      <div className="py-5">
        <h3 className="mb-3 text-xl font-bold">Informasi Pasien</h3>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <h5 className="text-neutral-400">Nama Pasien:</h5>
            <p className="font-semibold">Jojo</p>
          </div>
          <div>
            <h5 className="text-neutral-400">Jenis Kelamin:</h5>
            <p className="font-semibold">Laki-laki</p>
          </div>
          <div>
            <h5 className="text-neutral-400">Pekerjaan:</h5>
            <p className="font-semibold">Mahasiswa</p>
          </div>
          <div>
            <h5 className="text-neutral-400">Tanggal lahir:</h5>
            <p className="font-semibold">14 Maret 2003 (22 tahun)</p>
          </div>
        </div>
      </div>
      <div className="space-y-3 py-5">
        <h3 className="mb-3 text-xl font-bold">Keluhan</h3>
        <p>Telinga kiri nyeri, pendengaran berkurang</p>
      </div>
      <div className="space-y-3 py-5">
        <h3 className="mb-3 text-xl font-bold">Diagnosis</h3>
        <div className="space-y-2">
          {[...Array(2)].map((index) => (
            <div
              key={index}
              className="flex items-center justify-between gap-3 rounded-lg border border-yellow-400 bg-yellow-100 p-5"
            >
              <p className="font-semibold">Infeksi telinga dalam</p>
              <div className="space-y-2">
                <Button variant={"destructive"} size={"icon"}>
                  <TrashIcon />
                </Button>
              </div>
            </div>
          ))}
        </div>
        <div className="flex justify-center">
          <Button variant={"outline"}>
            <PlusIcon />
            <span>Tambah diagnosis</span>
          </Button>
        </div>
      </div>
      <div className="space-y-3 py-5">
        <h3 className="mb-3 text-xl font-bold">Resep Obat</h3>
        <div className="space-y-2">
          {[...Array(2)].map((index) => (
            <div
              key={index}
              className="flex items-center justify-between gap-3 rounded-lg border border-secondary-500 bg-secondary-100 p-5"
            >
              <div>
                <p className="font-semibold">Duoxal</p>
                <p>6 tetes, 2x sehari</p>
              </div>
              <div className="space-y-2">
                <Button variant={"destructive"} size={"icon"}>
                  <TrashIcon />
                </Button>
              </div>
            </div>
          ))}
        </div>
        <div className="flex justify-center">
          <Button variant={"outline"}>
            <PlusIcon />
            <span>Tambah obat</span>
          </Button>
        </div>
      </div>
    </section>
  );
}
