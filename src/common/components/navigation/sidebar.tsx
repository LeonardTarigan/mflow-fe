"use client";

import useLogout from "@/app/auth/login/hooks/useLogout";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "../button/button";
import { LogOutIcon } from "lucide-react";
import useCookiesData from "@/common/hooks/useCookiesData";
import { navMenus } from "@/common/lib/static/nav-menus";

export default function Sidebar() {
  const pathName = usePathname();
  const user = useCookiesData();

  const { mutate, isPending } = useLogout();

  const filteredNavMenus = navMenus.filter(({ eligibleRoles }) => {
    if (!eligibleRoles) return true;

    return eligibleRoles.includes(user.role);
  });

  return (
    <div className="hidden h-full shrink-0 basis-[18%] text-neutral-100 md:block">
      <nav className="flex h-full flex-col justify-between gap-5 rounded-2xl pt-0">
        <Link
          href={"/"}
          className="mt-2 flex items-center justify-center gap-3"
        >
          <div className="relative h-7 w-9 -translate-y-[2px]">
            <Image src={"/assets/img/logo-app-white.png"} alt="App Logo" fill />
          </div>
          <h1 className="whitespace-nowrap text-2xl font-black">MFlow App</h1>
        </Link>

        <div className="grow font-medium">
          {filteredNavMenus.map(({ path, label, icon }) => (
            <Link
              key={path}
              href={path}
              className={`flex items-center gap-2 rounded-xl p-3 transition-colors duration-150 hover:bg-primary-400 ${
                pathName === path && "bg-primary-400"
              }`}
            >
              {icon}
              <span>{label}</span>
            </Link>
          ))}
        </div>
        <Button
          onClick={() => mutate()}
          isLoading={isPending}
          variant={"ghost"}
          className="flex items-center gap-2"
        >
          <LogOutIcon className="size-5" />
          <span>Log out</span>
        </Button>
      </nav>
    </div>
  );
}
