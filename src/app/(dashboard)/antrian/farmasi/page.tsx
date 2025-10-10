import { Suspense } from "react";
import PharmacyQueueContainer from "./view/container/pharmacy-queue-container";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "MFlow | Antrian Farmasi",
};

export default function AdminQueuePage() {
  return (
    <Suspense>
      <PharmacyQueueContainer />
    </Suspense>
  );
}
