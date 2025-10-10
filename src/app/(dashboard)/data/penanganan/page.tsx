import { Suspense } from "react";
import TreatmentDataContainer from "./view/container/treatment-data-container";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "MFlow | Data Penanganan",
};

export default function TreatmentDataPage() {
  return (
    <Suspense>
      <TreatmentDataContainer />
    </Suspense>
  );
}
