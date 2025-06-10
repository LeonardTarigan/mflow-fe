"use client";

import { Suspense } from "react";
import PharmacyQueueContainer from "./view/container/pharmacy-queue-container";

export default function AdminQueuePage() {
  return (
    <Suspense>
      <PharmacyQueueContainer />
    </Suspense>
  );
}
