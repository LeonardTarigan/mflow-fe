"use client";

import ChipQueueStatus from "@/components/antrian/chip-queue-status";
import { Button } from "@/components/shared/button";
import ClockDigital from "@/components/shared/clock-digital";
import useFullscreen from "@/hooks/shared/useFullscreen";
import { FullscreenIcon } from "lucide-react";
import Image from "next/image";
import Marquee from "react-fast-marquee";

export default function LayarAntrianPage() {
  const { mainRef, enterFullscreen, isFullscreen } = useFullscreen();

  return (
    <main ref={mainRef} className="flex h-screen flex-col bg-neutral-100">
      {!isFullscreen && (
        <section className="flex justify-end px-5 py-2">
          <Button onClick={enterFullscreen} size={"icon"}>
            <FullscreenIcon />
          </Button>
        </section>
      )}
      <section className="flex grow gap-5 p-5">
        <div className="flex h-full basis-2/3 flex-col overflow-hidden rounded-xl bg-white">
          <h2 className="bg-primary-500 p-2 text-center font-bold text-2xl text-white">
            Antrian Aktif
          </h2>
          <div className="flex grow items-center justify-center p-5">
            <h3 className="bg-gradient-to-r from-primary-400 via-primary-500 to-primary-600 bg-clip-text text-center font-extrabold text-9xl text-transparent">
              U012
            </h3>
          </div>
          <div className="grid grid-cols-2 divide-x border-t text-center">
            <div className="space-y-2 p-5">
              <h3>Ruangan</h3>
              <p className="font-bold text-2xl">Poli Umum</p>
            </div>
            <div className="space-y-2 p-5">
              <h3>Dokter</h3>
              <p className="font-bold text-2xl">Dr. Hendra Wijaya</p>
            </div>
          </div>
        </div>

        <div className="flex h-full basis-1/3 flex-col overflow-hidden rounded-xl bg-white">
          <h2 className="bg-primary-500 p-2 text-center font-bold text-2xl text-white">
            Antrian
          </h2>
          <div className="grow">
            <div className="h-full max-h-full divide-y overflow-y-hidden">
              {[...Array(5)].map((_, index) => (
                <div
                  // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
                  key={index}
                  className="flex items-center justify-between gap-2 p-5"
                >
                  <h3 className="font-extrabold text-2xl">U01{index + 3}</h3>
                  <ChipQueueStatus status="waiting" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="flex max-w-full">
        <div className="flex grow gap-5 bg-gradient-to-r from-primary-600 to-primary-600 p-5 text-white">
          <div className="-translate-y-[2px] relative h-8 w-10">
            <Image src={"/assets/img/logo-app-white.png"} alt="App Logo" fill />
          </div>
          <Marquee
            gradient
            gradientColor="#7a0100"
            gradientWidth={50}
            className="w-full grow-0 overflow-hidden"
            autoFill
          >
            <p className="font-bold text-2xl">
              Nomor Antrian U012 silahkan menuju ruang Poli Umum&nbsp; - &nbsp;
            </p>
          </Marquee>
        </div>
        <div className="flex shrink-0 justify-center gap-1 bg-gradient-to-r from-primary-600 to-primary-500 p-5 text-white">
          <ClockDigital timeFormat="HH:mm" className="font-bold text-2xl" />{" "}
          <span className="font-semibold">WIB</span>
        </div>
      </section>
    </main>
  );
}
