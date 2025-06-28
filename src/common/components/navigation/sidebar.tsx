"use client";

import useLogout from "@/app/auth/login/hooks/useLogout";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "../button/button";
import { LogOutIcon } from "lucide-react";
import useCookiesData from "@/common/hooks/useCookiesData";
import { navMenus } from "@/common/lib/static/nav-menus";
import { cn } from "@/common/lib/utils";
import { logoFont } from "@/common/lib/fonts";

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
      <nav
        className={`${cn(logoFont.className, "flex h-full flex-col justify-between gap-5 rounded-2xl")}`}
      >
        <Link
          href={"/"}
          className="mt-2 flex items-center justify-center gap-2"
        >
          <div className="relative h-9 w-11">
            <Image src={"/assets/img/logo-app-white.png"} alt="App Logo" fill />
          </div>
          <div>
            <h1 className="whitespace-nowrap text-2xl !font-black">MFlow.</h1>
            <p className="-mt-[5px] text-xs font-semibold">
              Klinik Pratama Millenium
            </p>
          </div>
        </Link>

        <div className="grow pt-2 font-medium">
          {filteredNavMenus.map(({ path, label, icon }) => (
            <Link
              key={path}
              href={path}
              className={`${cn("flex items-center gap-2 rounded-xl p-3 transition-colors duration-150 hover:bg-primary-400", pathName === path && "bg-primary-400")}`}
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
