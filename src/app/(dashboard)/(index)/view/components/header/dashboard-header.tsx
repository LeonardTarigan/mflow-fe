"use client";

import DigitalClock from "@/common/components/clock/digital-clock";
import useGreeting from "@/common/hooks/useGreeting";
import { IEmployee } from "@/common/models/employee.model";
import { format } from "date-fns";
import { id } from "date-fns/locale";
import { useCookies } from "next-client-cookies";
import Image from "next/image";

export default function DashboardHeader() {
  const greeting = useGreeting();
  const cookies = useCookies();

  const user: IEmployee = JSON.parse(cookies.get("user") || "{}");

  return (
    <header className="flex items-center justify-between gap-5 rounded-xl bg-white p-5">
      <div className="flex flex-col">
        <h2 className="text-lg font-bold">
          {greeting}, {user?.username}
        </h2>
        <div className="flex items-end gap-1 text-sm font-medium">
          <p>{format(new Date(), "EEEE, dd MMMM yyyy", { locale: id })}, </p>
          <DigitalClock />
        </div>
      </div>
      <div className="relative size-10 overflow-hidden rounded-full bg-neutral-200">
        <Image
          src={"/assets/img/avatar-default.png"}
          alt="Profile Picture"
          fill
        />
      </div>
    </header>
  );
}
