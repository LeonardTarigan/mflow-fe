import Sidebar from "@/common/components/navigation/sidebar";
import SidebarDrawer from "@/common/components/navigation/sidebar-drawer";
import type { Metadata } from "next";
import { CookiesProvider } from "next-client-cookies/server";
import DashboardHeader from "./(index)/view/components/header/dashboard-header";

export const metadata: Metadata = {
  title: "MFlow | Dashboard",
};

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <CookiesProvider>
      <div className="flex h-screen flex-col gap-2 overflow-hidden bg-gradient-to-br from-primary-500 via-primary-600 to-primary-700 p-2 md:flex-row md:gap-5 md:p-3">
        <SidebarDrawer />
        <Sidebar />
        <div className="flex w-full grow flex-col overflow-auto">
          <DashboardHeader />
          <div className="h-full w-full overflow-auto rounded-2xl bg-neutral-100 p-5">
            {children}
          </div>
        </div>
      </div>
    </CookiesProvider>
  );
}
