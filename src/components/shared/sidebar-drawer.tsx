"use client";

import {
  Drawer,
  DrawerContent,
  DrawerTrigger,
} from "@/components/shared/drawer";
import { MenuIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function SidebarDrawer() {
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
          asdasd
        </DrawerContent>
      </Drawer>
    </div>
  );
}
