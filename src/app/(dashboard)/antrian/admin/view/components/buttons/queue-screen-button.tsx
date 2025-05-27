import { Button } from "@/common/components/button/button";
import { MonitorIcon } from "lucide-react";

export default function QueueScreenButton() {
  const openQueueScreen = () =>
    window.open(
      "/layar-tunggu/pasien",
      "_blank",
      "width=1920,height=600,noopener,noreferrer",
    );

  return (
    <Button onClick={openQueueScreen} variant={"outline"} className="w-full">
      <MonitorIcon />
      <span>Layar Tunggu</span>
    </Button>
  );
}
