import { Suspense } from "react";
import CareHistoryContainer from "./view/container/care-history-container";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "MFlow | Riwayat Pelayanan",
};

export default function CareHistoryPage() {
  return (
    <Suspense>
      <CareHistoryContainer />
    </Suspense>
  );
}
