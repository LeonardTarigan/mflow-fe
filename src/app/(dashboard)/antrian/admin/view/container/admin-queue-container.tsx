import DashboardHeader from "@/app/(dashboard)/(index)/view/components/header/dashboard-header";
import QueueFilterSection from "../components/sections/queue-filter-section";
import QueueList from "../components/sections/queue-list";

export default function AdminQueueContainer() {
  return (
    <main className="space-y-5">
      <DashboardHeader />
      <div className="flex gap-5">
        <div className="basis-[40%] space-y-5">
          <QueueFilterSection />
        </div>
        <QueueList />
      </div>
    </main>
  );
}
