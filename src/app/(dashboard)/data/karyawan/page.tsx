"use client";

import { Suspense } from "react";
import EmployeeDataContainer from "./view/container/employee-data-container";

export default function EmployeeDataPage() {
  return (
    <Suspense>
      <EmployeeDataContainer />
    </Suspense>
  );
}
