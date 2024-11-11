"use client";

import ClockDigital from "@/components/shared/clock-digital";
import useGreeting from "@/hooks/shared/useGreeting";
import { format } from "date-fns";
import { id } from "date-fns/locale";
import Image from "next/image";

export default function Header() {
  const greeting = useGreeting();

  return (
    <header className="flex items-center justify-between gap-5 rounded-xl pb-3">
      <div className="flex flex-col">
        <h2 className="font-bold text-2xl">{greeting}, Admin</h2>
        <div className="flex items-end gap-1 font-medium">
          <p>{format(new Date(), "EEEE, dd MMMM yyyy", { locale: id })}, </p>
          <ClockDigital />
        </div>
      </div>
      <div className="relative size-12 overflow-hidden rounded-full bg-neutral-200">
        <Image
          src={"/assets/img/avatar-default.png"}
          alt="Profile Picture"
          fill
        />
      </div>
    </header>
  );
}
