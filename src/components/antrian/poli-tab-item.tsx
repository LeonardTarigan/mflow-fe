import type { Dispatch, SetStateAction } from "react";

interface IPoliTabItem {
  onSetTab: Dispatch<SetStateAction<number>>;
  index: number;
  currentTab: number;
  name: string;
  queue_waiting: number;
  queue_total: number;
  doctor?: string;
}

export default function PoliTabItem({
  index,
  currentTab,
  onSetTab,
  name,
  queue_waiting,
  queue_total,
  doctor,
}: IPoliTabItem) {
  return (
    // biome-ignore lint/a11y/useKeyWithClickEvents: <explanation>
    <div
      onClick={() => onSetTab(index)}
      className={`flex h-20 cursor-pointer items-center justify-between gap-2 rounded-md px-3 text-sm transition-colors duration-150 ${index === currentTab ? "!text-white" : "hover:bg-neutral-100"}`}
    >
      <div>
        <h3 className="font-semibold text-lg">{name}</h3>
        <p
          className={`transition-colors duration-150 ${index !== currentTab ? "text-neutral-400" : ""}`}
        >
          {doctor}
        </p>
      </div>
      <p>
        Sisa {queue_waiting}/{queue_total} Antrian
      </p>
    </div>
  );
}
