"use client";

import { Suspense } from "react";
import DrugDataContainer from "./view/container/drug-data-container";

export default function DrugDataPage() {
  return (
    <Suspense>
      <DrugDataContainer />
    </Suspense>
  );
}
