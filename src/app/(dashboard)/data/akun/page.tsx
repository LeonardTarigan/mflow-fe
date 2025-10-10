import { Suspense } from "react";
import AccountDataContainer from "./view/container/account-data-container";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "MFlow | Data Akun",
};

export default function AccountDataPage() {
  return (
    <Suspense>
      <AccountDataContainer />
    </Suspense>
  );
}
