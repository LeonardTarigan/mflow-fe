"use client";

import CardQueue from "@/components/antrian/card-queue";
import ModalAddQueue from "@/components/antrian/modal-add-queue";
import PoliTabs from "@/components/antrian/poli-tabs";
import { Button } from "@/components/shared/button";
import Header from "@/components/shared/header";
import { MonitorIcon, PlayIcon } from "lucide-react";

export default function QueueAdminPage() {
  const openLayarTunggu = () => {
    window.open(
      "/layar/antrian",
      "_blank",
      "width=1920,height=600,noopener,noreferrer",
    );
  };

  return (
    <main className="space-y-5">
      <Header />
      <div className="flex gap-2">
        <section className="flex basis-1/2 flex-col gap-2">
          <div className="basis-1/2 space-y-2">
            <CardQueue status="on-progress" />
            <CardQueue status="waiting" />
            <CardQueue status="waiting" />
            <CardQueue status="waiting" />
            <CardQueue status="waiting" />
          </div>
        </section>
        <section className="basis-1/2 space-y-2">
          <div className="space-y-2 rounded-lg bg-white p-5">
            <ModalAddQueue />
            <div className="flex w-full gap-2">
              <Button
                size={"sm"}
                onClick={openLayarTunggu}
                className="w-1/2 gap-2"
                variant={"outline"}
              >
                <MonitorIcon size={15} />
                <span>Layar Tunggu</span>
              </Button>
              <Button size={"sm"} className="w-1/2" variant={"secondary"}>
                <PlayIcon size={15} />
                <span>Lanjut Antrian</span>
              </Button>
            </div>
          </div>
          <PoliTabs />
        </section>
      </div>
    </main>
  );
}
