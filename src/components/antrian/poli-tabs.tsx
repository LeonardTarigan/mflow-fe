import { useState } from "react";
import PoliTabItem from "./poli-tab-item";

export default function PoliTabs() {
  const [selectedPoli, setSelectedPoli] = useState(0);

  return (
    <div className="relative z-0 overflow-hidden rounded-lg bg-white p-5">
      <h3 className="mb-3 border-b pb-2 font-bold text-2xl">
        Antrian Berjalan
      </h3>
      <div
        className="-z-10 absolute left-0 h-20 w-full px-5 transition-all duration-300"
        style={{
          transform: `translateY(${selectedPoli * 5}rem)`,
        }}
      >
        <div className="size-full rounded-md bg-primary-500" />
      </div>
      <PoliTabItem
        name="Semua Poli"
        queue_waiting={10}
        queue_total={32}
        index={0}
        currentTab={selectedPoli}
        onSetTab={setSelectedPoli}
      />
      <PoliTabItem
        name="Poli Umum"
        doctor="dr. Niko Johansen"
        queue_waiting={5}
        queue_total={20}
        index={1}
        currentTab={selectedPoli}
        onSetTab={setSelectedPoli}
      />
      <PoliTabItem
        name="Poli Gigi"
        doctor="drg. Flora Netania"
        queue_waiting={10}
        queue_total={12}
        index={2}
        currentTab={selectedPoli}
        onSetTab={setSelectedPoli}
      />
    </div>
  );
}
