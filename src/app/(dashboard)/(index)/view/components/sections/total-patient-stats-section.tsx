import { FileCheck2Icon, TrendingUpIcon } from "lucide-react";

export default function TotalPatientStatsSection() {
  return (
    <section className="flex basis-1/2 flex-col justify-between gap-1 rounded-xl bg-white p-5">
      <div className="flex items-center gap-2">
        <div className="flex items-center justify-center rounded-full bg-secondary-100 bg-opacity-50 p-2">
          <FileCheck2Icon size={20} className="text-secondary-600" />
        </div>
        <h3 className="text-xl font-semibold">Total Pasien Terdaftar</h3>
      </div>
      <div className="flex items-center gap-3">
        <p className="text-5xl font-bold">567</p>
        <div className="flex items-center gap-1 rounded-full bg-success-100 px-4 py-1 text-sm font-semibold text-success-600">
          <TrendingUpIcon size={18} />
          <p>20%</p>
        </div>
      </div>
      <p className="text-sm leading-tight">
        Jumlah pasien yang terdaftar minggu ini meningkat 30% dari bulan
        sebelumya.
      </p>
    </section>
  );
}
