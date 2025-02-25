"use client";

import { Suspense } from "react";
import AccountDataContainer from "./view/container/account-data-container";

export default function AccountDataPage() {
  return (
    <Suspense>
      <AccountDataContainer />
    </Suspense>
  );
}
