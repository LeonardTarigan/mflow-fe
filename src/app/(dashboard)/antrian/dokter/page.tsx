"use client";

import { Suspense } from "react";
import DoctorQueueContainer from "./view/container/doctor-queue-container";

export default function AdminQueuePage() {
  return (
    <Suspense>
      <DoctorQueueContainer />
    </Suspense>
  );
}
