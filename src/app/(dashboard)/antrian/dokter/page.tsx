import { Suspense } from "react";
import DoctorQueueContainer from "./view/container/doctor-queue-container";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "MFlow | Pemeriksaan Pasien",
};

export default function DoctorQueuePage() {
  return (
    <Suspense>
      <DoctorQueueContainer />
    </Suspense>
  );
}
