import DashboardHeader from "@/app/(dashboard)/(index)/view/components/header/dashboard-header";
import OrderDetail from "../components/sections/order-detail";
import QueueList from "../components/sections/queue-list";

export default function PharmacyQueueContainer() {
  return (
    <main className="space-y-5">
      <DashboardHeader />
      <div className="flex gap-5">
        <OrderDetail />
        <QueueList />
      </div>
    </main>
  );
}
