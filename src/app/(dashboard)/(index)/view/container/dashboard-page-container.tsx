"use client";

import DiagnosisStatsSection from "../components/sections/diagnosis-stats-section";
import { IncomeStatsSection } from "../components/sections/income-stats-section";
import PatientAgeStatsSection from "../components/sections/patient-age-stats-section";
import DailyVisitorStatsSection from "../components/sections/queue-stats-section";
import TotalPatientStatsSection from "../components/sections/total-patient-stats-section";
import VisitStatsSection from "../components/sections/visit-stats-section";

export default function DashboardPageContainer() {
  return (
    <main className="space-y-5">
      <div className="flex justify-between gap-5">
        <IncomeStatsSection />
        <div className="flex w-full basis-[30%] flex-col gap-5">
          <DailyVisitorStatsSection />
          <TotalPatientStatsSection />
        </div>
      </div>
      <div className="flex gap-5">
        <div className="flex basis-[70%] gap-5">
          <DiagnosisStatsSection />
          <PatientAgeStatsSection />
        </div>
        <VisitStatsSection />
      </div>
    </main>
  );
}
