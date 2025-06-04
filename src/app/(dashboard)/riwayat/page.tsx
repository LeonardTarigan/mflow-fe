"use client";

import { Suspense } from "react";
import CareHistoryContainer from "./view/container/care-history-container";

export default function CareHistoryPage() {
  return (
    <Suspense>
      <CareHistoryContainer />
    </Suspense>
  );
}
