"use client";

import { Suspense } from "react";
import PatientDataContainer from "./view/container/patient-data-container";

export default function PatientDataPage() {
  return (
    <Suspense>
      <PatientDataContainer />
    </Suspense>
  );
}
