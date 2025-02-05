import QueryClientWrapper from "@/components/shared/query-client-wrapper";
import { mainFont } from "@/lib/fonts";
import type { Metadata } from "next";
import { Toaster } from "react-hot-toast";
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
      <body className={`${mainFont.className} bg-neutral-100 antialiased`}>
        <Toaster
          toastOptions={{
            style: {
              fontWeight: 500,
            },
            success: {
              iconTheme: {
                primary: "#77aa39",
                secondary: "#eaf6da",
              },
              style: {
                backgroundColor: "#eaf6da",
                color: "#597f2b",
              },
            },
            error: {
              iconTheme: {
                primary: "#ac1e31",
                secondary: "#f7d4d8",
              },
              style: {
                backgroundColor: "#f7d4d8",
                color: "#ac1e31",
              },
            },
            duration: 2000,
          }}
        />
        <QueryClientWrapper>{children}</QueryClientWrapper>
      </body>
    </html>
  );
}
