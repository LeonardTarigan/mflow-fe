import DashboardHeader from "@/app/(dashboard)/(index)/view/components/header/dashboard-header";
import PatientDetail from "../components/sections/patient-detail";
import QueueList from "../components/sections/queue-list";

export default function DoctorQueueContainer() {
  return (
    <main className="space-y-5">
      <DashboardHeader />
      <div className="flex gap-5">
        <PatientDetail />
        <QueueList />
      </div>
    </main>
  );
}
