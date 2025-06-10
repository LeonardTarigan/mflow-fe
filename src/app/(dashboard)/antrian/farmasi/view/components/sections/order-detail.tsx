import { Button } from "@/common/components/button/button";
import { CheckIcon } from "lucide-react";

export default function OrderDetail() {
  return (
    <section className="basis-[60%] space-y-5 divide-y rounded-xl bg-white p-5">
      <div className="flex items-center justify-between gap-2">
        <h2 className="text-primary-gradient text-4xl font-black">#U003</h2>
        <Button className="bg-emerald-500 hover:bg-emerald-600">
          <CheckIcon />
          <span>Selesaikan Pesanan</span>
        </Button>
      </div>
      <div className="pt-5">
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
      <div className="space-y-3 pt-5">
        <h3 className="mb-3 text-xl font-bold">Keluhan</h3>
        <p>Telinga kiri nyeri, pendengaran berkurang</p>
      </div>
      <div className="space-y-3 pt-5">
        <h3 className="mb-3 text-xl font-bold">Diagnosis</h3>
        <p>Infeksi telinga dalam</p>
      </div>
      <div className="space-y-3 pt-5">
        <h3 className="mb-3 text-xl font-bold">Resep Obat</h3>
        {[...Array(2)].map((index) => (
          <div key={index} className="flex items-center justify-between gap-3">
            <div>
              <p className="font-semibold">Duoxal</p>
              <p>6 tetes, 2x sehari</p>
            </div>
            <div>
              <p>1 x Rp 20.000</p>
            </div>
          </div>
        ))}
        <div className="flex items-center justify-between gap-3 pt-5 font-semibold">
          <p>Subtotal</p>
          <p className="text-xl">Rp 80.000</p>
        </div>
      </div>
    </section>
  );
}
