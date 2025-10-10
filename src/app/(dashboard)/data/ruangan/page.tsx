import { Suspense } from "react";
import RoomDataContainer from "./view/container/room-data-container";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "MFlow | Data Ruangan",
};

export default function RoomDataPage() {
  return (
    <Suspense>
      <RoomDataContainer />
    </Suspense>
  );
}
