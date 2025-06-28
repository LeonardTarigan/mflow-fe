"use client";

import { navMenus } from "@/common/lib/static/nav-menus";
import { IEmployee } from "@/common/models/employee.model";
import { useCookies } from "next-client-cookies";
import Image from "next/image";
import { usePathname } from "next/navigation";

export default function DashboardHeader() {
  const cookies = useCookies();
  const pathName = usePathname();

  const label =
    navMenus.find(({ path }) => path === pathName)?.label || "Dashboard";

  const user: IEmployee = JSON.parse(cookies.get("user") || "{}");

  return (
    <header className="flex items-center justify-between gap-3 px-5 pb-3 pt-1 text-white">
      <h3 className="text-2xl font-bold">{label}</h3>
      <div className="flex items-center justify-end gap-3">
        <div className="text-end">
          <p className="font-semibold">{user.username}</p>
          <p className="-mt-[2px] text-xs text-primary-100">{user.email}</p>
        </div>

        <div className="relative size-9 overflow-hidden rounded-full bg-neutral-200">
          <Image
            src={"/assets/img/avatar-default.png"}
            alt="Profile Picture"
            fill
          />
        </div>
      </div>
    </header>
  );
}
