import { Suspense } from "react";
import PatientDataContainer from "./view/container/patient-data-container";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "MFlow | Data Pasien",
};

export default function PatientDataPage() {
  return (
    <Suspense>
      <PatientDataContainer />
    </Suspense>
  );
}
