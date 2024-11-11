"use client";

import CardStats from "@/components/dashboard/card-stats";
import { ChartDiagnosis } from "@/components/dashboard/chart-diagnosis";
import { ChartPatient } from "@/components/dashboard/chart-patient";
import { ChartTotalVisitors } from "@/components/dashboard/chart-total-visitors";
import Header from "@/components/shared/header";
import CountUp from "react-countup";

export default function DashboardPage() {
  return (
    <main className="space-y-5">
      <Header />
      <section className="grid grid-cols-4 gap-3">
        <CardStats
          label="Total Kunjungan "
          containerClassName="col-span-4 md:col-span-3 row-span-2"
          contentClassName="h-full"
        >
          <ChartTotalVisitors />
        </CardStats>
        <CardStats
          label="Pasien Hari Ini"
          containerClassName="col-span-2 md:col-span-1"
          comparison={{ type: "increase", value: "30%" }}
        >
          <CountUp
            start={0}
            end={30}
            className="font-black text-5xl text-primary-gradient md:text-7xl"
          />
        </CardStats>
        <CardStats
          label="Pasien Baru"
          containerClassName="col-span-2 md:col-span-1"
          comparison={{ type: "decrease", value: "50%" }}
        >
          <CountUp
            start={0}
            end={20}
            className="font-black text-5xl text-primary-gradient md:text-7xl"
          />
        </CardStats>
        <CardStats
          label="Pendapatan Hari Ini"
          containerClassName="col-span-4 md:col-span-2"
        >
          <p className="font-black text-4xl text-primary-gradient md:text-5xl">
            Rp 12.000.000
          </p>
        </CardStats>
        <CardStats
          label="Demografi"
          containerClassName="col-span-2 md:col-span-1"
          contentClassName="p-0"
        >
          <ChartPatient />
        </CardStats>
        <CardStats
          label="Diagnosa"
          containerClassName="col-span-2 md:col-span-1"
          contentClassName="p-0"
        >
          <ChartDiagnosis />
        </CardStats>
      </section>
    </main>
  );
}
