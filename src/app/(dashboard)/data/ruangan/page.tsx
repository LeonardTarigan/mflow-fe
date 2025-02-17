import { Suspense } from "react";
import RoomDataContainer from "./view/container/room-data-container";

export default function RoomDataPage() {
  return (
    <Suspense>
      <RoomDataContainer />
    </Suspense>
  );
}
