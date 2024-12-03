"use client";

import CardQueue from "@/components/antrian/card-queue";
import FormAddQueue from "@/components/antrian/form-add-queue";
import { Button } from "@/components/shared/button";
import Header from "@/components/shared/header";
import { MonitorIcon, PlayIcon } from "lucide-react";

export default function QueuePage() {
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
      <div className="flex gap-5">
        <section className="basis-1/2 space-y-2">
          <CardQueue status="on-progress" />
          <CardQueue status="waiting" />
          <CardQueue status="waiting" />
          <CardQueue status="waiting" />
          <CardQueue status="waiting" />
        </section>
        <section className="basis-1/2 space-y-5">
          <div className="flex w-full gap-1">
            <Button
              onClick={openLayarTunggu}
              className="w-1/2 gap-2"
              variant={"outline"}
            >
              <MonitorIcon size={15} />
              <span>Layar Tunggu</span>
            </Button>
            <Button className="w-1/2 gap-2 bg-green-500 hover:bg-green-600">
              <PlayIcon size={15} />
              <span>Lanjut Antrian</span>
            </Button>
          </div>
          <FormAddQueue />
        </section>
      </div>
    </main>
  );
}
