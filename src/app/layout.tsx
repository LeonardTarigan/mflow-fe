import QueryClientWrapper from "@/components/shared/query-client-wrapper";
import { mainFont } from "@/lib/fonts";
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "MFlow",
  description: "Aplikasi manajemen pasien umum",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${mainFont.className} antialiased`}>
        <QueryClientWrapper>{children}</QueryClientWrapper>
      </body>
    </html>
  );
}
