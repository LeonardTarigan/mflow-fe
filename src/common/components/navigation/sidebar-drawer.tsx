"use client";

import { navManus } from "@/common/lib/static/nav-menus";
import { LogOutIcon, MenuIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "../button/button";
import { Drawer, DrawerContent, DrawerTrigger } from "../drawer/drawer";

export default function SidebarDrawer() {
  const pathName = usePathname();

  return (
    <div className="flex items-center justify-between gap-5 py-2 md:hidden">
      <Link
        href={"/"}
        className="flex items-center justify-center gap-2 text-neutral-100"
      >
        <div className="-translate-y-[2px] relative h-6 w-8">
          <Image src={"/assets/img/logo-app-white.png"} alt="App Logo" fill />
        </div>
        <h1 className="whitespace-nowrap font-black text-2xl">MFlow App</h1>
      </Link>
      <Drawer direction="left">
        <DrawerTrigger className="w-fit rounded-md p-2 text-neutral-100">
          <MenuIcon />
        </DrawerTrigger>
        <DrawerContent className="h-screen w-2/3 rounded-none border-none bg-gradient-to-br from-primary-500 via-primary-600 to-primary-700 p-5 text-neutral-100">
          <Link
            href={"/"}
            className="flex items-center justify-center gap-3 border-neutral-200 border-b pb-5"
          >
            <div className="-translate-y-[2px] relative h-6 w-8">
              <Image
                src={"/assets/img/logo-app-white.png"}
                alt="App Logo"
                fill
              />
            </div>
            <h1 className="whitespace-nowrap font-black text-2xl">MFlow App</h1>
          </Link>
          <div className="flex h-full flex-col justify-between">
            <div className="grow pt-5 font-medium">
              {navManus.map(({ path, label, icon }) => (
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
            <Button variant={"ghost"} className="space-x-1">
              <LogOutIcon className="size-5" />
              <span>Log out</span>
            </Button>
          </div>
        </DrawerContent>
      </Drawer>
    </div>
  );
}
