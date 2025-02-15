import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "MFlow | Login",
};

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
