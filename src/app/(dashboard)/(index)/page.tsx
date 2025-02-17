import { Suspense } from "react";
import DashboardPageContainer from "./view/container/dashboard-page-container";

export default function DashboardPage() {
  return (
    <Suspense>
      <DashboardPageContainer />
    </Suspense>
  );
}
