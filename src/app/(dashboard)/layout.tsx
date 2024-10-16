import Sidebar from "@/components/shared/sidebar";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "MFlow | Dashboard",
};

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex h-screen gap-5 overflow-hidden bg-gradient-to-br from-primary-500 via-primary-600 to-primary-700 p-5">
      <Sidebar />
      <main className="grow overflow-auto rounded-2xl bg-neutral-100 p-5">
        {children}
      </main>
    </div>
  );
}
