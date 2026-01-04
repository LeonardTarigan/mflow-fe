"use client";

import { IQuickStats } from "@/common/models/statistic.model";
import {
  CalendarCheckIcon,
  SealCheckIcon,
  UserPlusIcon,
} from "@phosphor-icons/react";
import { useEffect, useState } from "react";
import {
  getTodaysVisit,
  getTotalNewPatient,
  getTotalRegistredPatient,
} from "../../repository/dashboard.repository";
import { IncomeStatsSection } from "../components/sections/income-stats-section";
import QuickStatSection from "../components/sections/quick-stat-section";

export default function DashboardPageContainer() {
  const [isLoading, setIsLoading] = useState(false);
  const [todaysVisit, setTodaysVisit] = useState<IQuickStats>();
  const [totalRegisteredPatient, setTotalRegisteredPatient] =
    useState<IQuickStats>();
  const [totalNewPatient, setTotalNewPatient] = useState<IQuickStats>();

  const getDatas = async () => {
    setIsLoading(true);

    const todaysVisit = await getTodaysVisit();
    const totalRegisteredPatient = await getTotalRegistredPatient();
    const totalNewPatient = await getTotalNewPatient();

    setTodaysVisit(todaysVisit.data);
    setTotalRegisteredPatient(totalRegisteredPatient.data);
    setTotalNewPatient(totalNewPatient.data);

    setIsLoading(false);
  };

  useEffect(() => {
    getDatas();
  }, []);

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
          isLoading={isLoading}
          value={todaysVisit?.total || 0}
          percentage={todaysVisit?.percentage || 0}
          description={`Jumlah meningkat ${todaysVisit?.percentage || 0}% dari hari sebelumya`}
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
          isLoading={isLoading}
          value={totalRegisteredPatient?.total || 0}
          percentage={totalRegisteredPatient?.percentage || 0}
          description={`Jumlah meningkat ${totalRegisteredPatient?.percentage || 0}% dari bulan sebelumya`}
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
          isLoading={isLoading}
          value={totalNewPatient?.total || 0}
          percentage={totalNewPatient?.percentage || 0}
          description={`Jumlah meningkat ${totalNewPatient?.percentage || 0}% dari bulan sebelumya`}
        />
      </div>
      <div className="flex justify-between gap-5">
        <IncomeStatsSection />
      </div>
    </main>
  );
}
