import { CookiesProvider } from "next-client-cookies/server";
import DashboardPageContainer from "./view/container/dashboard-page-container";

export default function DashboardPage() {
  return (
    <CookiesProvider>
      <DashboardPageContainer />
    </CookiesProvider>
  );
}
