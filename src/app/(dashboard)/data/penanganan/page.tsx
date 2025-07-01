import { Suspense } from "react";
import TreatmentDataContainer from "./view/container/treatment-data-container";

export default function TreatmentDataPage() {
  return (
    <Suspense>
      <TreatmentDataContainer />
    </Suspense>
  );
}
