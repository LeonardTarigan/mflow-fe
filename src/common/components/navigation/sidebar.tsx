"use client";

import useLogout from "@/app/auth/login/hooks/useLogout";
import useCookiesData from "@/common/hooks/useCookiesData";
import { logoFont } from "@/common/lib/fonts";
import { navMenus } from "@/common/lib/static/nav-menus";
import { cn } from "@/common/lib/utils";
import { SignOutIcon } from "@phosphor-icons/react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "../button/button";

export default function Sidebar() {
  const pathName = usePathname();
  const user = useCookiesData();

  const { mutate, isPending } = useLogout();

  return (
    <div className="hidden h-full shrink-0 basis-[18%] text-neutral-100 md:block">
      <nav
        className={cn(
          logoFont.className,
          "flex h-full flex-col justify-between gap-5 rounded-2xl",
        )}
      >
        <Link href="/" className="mt-2 flex items-center justify-center gap-2">
          <div className="relative h-9 w-11">
            <Image src="/assets/img/logo-app-white.png" alt="App Logo" fill />
          </div>
          <div>
            <h1 className="whitespace-nowrap text-2xl !font-black">MFlow.</h1>
            <p className="-mt-[5px] text-xs font-semibold">
              Klinik Pratama Millenium
            </p>
          </div>
        </Link>

        <div className="grow space-y-4 overflow-y-auto pt-2 font-medium">
          {navMenus.map(({ label, children }) => {
            const filteredChildren = children.filter(
              (child) =>
                !child.eligibleRoles || child.eligibleRoles.includes(user.role),
            );

            if (filteredChildren.length === 0) return null;

            return (
              <div key={label}>
                <p className="pb-2 text-sm font-semibold tracking-wider">
                  {label}
                </p>
                <div className="mt-1 space-y-1">
                  {filteredChildren.map(({ path, label, icon }) => (
                    <Link
                      key={path}
                      href={path}
                      className={cn(
                        "flex items-center gap-2 rounded-lg px-4 py-2 opacity-80 transition-colors duration-150 hover:bg-primary-400",
                        pathName === path && "bg-primary-400 opacity-100",
                      )}
                    >
                      {icon}
                      <span>{label}</span>
                    </Link>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        <Button
          onClick={() => mutate()}
          isLoading={isPending}
          variant="ghost"
          className="flex items-center gap-2"
        >
          <SignOutIcon size={24} weight="fill" />
          <span>Log out</span>
        </Button>
      </nav>
    </div>
  );
}
