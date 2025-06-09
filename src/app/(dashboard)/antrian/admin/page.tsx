"use client";

import { Suspense } from "react";
import AdminQueueContainer from "./view/container/admin-queue-container";

export default function AdminQueuePage() {
  return (
    <Suspense>
      <AdminQueueContainer />
    </Suspense>
  );
}
