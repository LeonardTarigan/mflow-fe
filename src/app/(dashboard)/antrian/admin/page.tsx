import { Suspense } from "react";
import AdminQueueContainer from "./view/container/admin-queue-container";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "MFlow | Antrian Pasien",
};

export default function AdminQueuePage() {
  return (
    <Suspense>
      <AdminQueueContainer />
    </Suspense>
  );
}
