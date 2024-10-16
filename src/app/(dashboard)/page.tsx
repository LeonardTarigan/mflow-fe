"use client";

import CardStats from "@/components/dashboard/card-stats";
import { ChartDiagnosis } from "@/components/dashboard/chart-diagnosis";
import { ChartPatient } from "@/components/dashboard/chart-patient";
import { ChartTotalVisitors } from "@/components/dashboard/chart-total-visitors";
import ClockDigital from "@/components/shared/clock-digital";
import useGreeting from "@/hooks/useGreeting";
import { format } from "date-fns";
import { id } from "date-fns/locale";
import Image from "next/image";
import CountUp from "react-countup";

export default function DashboardPage() {
  const greeting = useGreeting();

  return (
    <main className="space-y-5">
      <section className="flex items-center justify-between gap-5 rounded-xl pb-3">
        <div className="flex flex-col">
          <h2 className="font-bold text-2xl">{greeting}, Admin</h2>
          <div className="flex items-end gap-1 font-medium">
            <p>{format(new Date(), "EEEE, dd MMMM yyyy", { locale: id })}, </p>
            <ClockDigital />
          </div>
        </div>
        <div className="relative size-12 overflow-hidden rounded-full bg-neutral-200">
          <Image
            src={"/assets/img/avatar-default.png"}
            alt="Profile Picture"
            fill
          />
        </div>
      </section>
      <section className="grid grid-cols-4 gap-5">
        <CardStats
          label="Total Kunjungan "
          containerClassName="col-span-3 row-span-2"
          contentClassName="h-full"
        >
          <ChartTotalVisitors />
        </CardStats>
        <CardStats
          label="Pasien Hari Ini"
          comparison={{ type: "increase", value: "30%" }}
        >
          <CountUp
            start={0}
            end={30}
            className="font-black text-7xl text-primary-gradient"
          />
        </CardStats>
        <CardStats
          label="Pasien Baru"
          comparison={{ type: "decrease", value: "50%" }}
        >
          <CountUp
            start={0}
            end={20}
            className="font-black text-7xl text-primary-gradient"
          />
        </CardStats>
        <CardStats label="Pendapatan Hari Ini" containerClassName="col-span-2">
          <p className="font-black text-5xl text-primary-gradient">
            Rp 12.000.000
          </p>
        </CardStats>
        <CardStats label="Demografi" contentClassName="p-0">
          <ChartPatient />
        </CardStats>
        <CardStats label="Diagnosa" contentClassName="p-0">
          <ChartDiagnosis />
        </CardStats>
      </section>
    </main>
  );
}
