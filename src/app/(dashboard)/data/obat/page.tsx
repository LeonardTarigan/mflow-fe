import { Suspense } from "react";
import DrugDataContainer from "./view/container/drug-data-container";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "MFlow | Data Obat",
};

export default function DrugDataPage() {
  return (
    <Suspense>
      <DrugDataContainer />
    </Suspense>
  );
}
