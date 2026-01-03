"use client";

import {
  CalendarCheckIcon,
  SealCheckIcon,
  UserPlusIcon,
} from "@phosphor-icons/react";
import { IncomeStatsSection } from "../components/sections/income-stats-section";
import QuickStatSection from "../components/sections/quick-stat-section";

export default function DashboardPageContainer() {
  return (
    <main className="space-y-5">
      <div className="grid grid-cols-3 gap-5">
        <QuickStatSection
          title="Kunjungan Hari Ini"
          icon={
            <CalendarCheckIcon
              size={20}
              weight="bold"
              className="text-secondary-500"
            />
          }
          value={34}
          percentage={30}
          description="Jumlah meningkat 30% dari hari sebelumya"
        />
        <QuickStatSection
          title="Total Pasien Terdaftar"
          icon={
            <SealCheckIcon
              size={20}
              weight="bold"
              className="text-secondary-500"
            />
          }
          value={34}
          percentage={30}
          description="Jumlah meningkat 30% dari bulan sebelumya."
        />
        <QuickStatSection
          title="Pasien Baru Bulan Ini"
          icon={
            <UserPlusIcon
              size={20}
              weight="bold"
              className="text-secondary-500"
            />
          }
          value={34}
          percentage={30}
          description="Jumlah meningkat 30% dari bulan sebelumya."
        />
      </div>
      <div className="flex justify-between gap-5">
        <IncomeStatsSection />
      </div>
    </main>
  );
}
