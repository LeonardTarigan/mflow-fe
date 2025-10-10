import { Suspense } from "react";
import DashboardPageContainer from "./view/container/dashboard-page-container";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "MFlow | Dashboard",
};

export default function DashboardPage() {
  return (
    <Suspense>
      <DashboardPageContainer />
    </Suspense>
  );
}
