"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { navManus } from "@/lib/static/nav-menus";
import { Button } from "./button";
import { LogOutIcon } from "lucide-react";
import useLogout from "@/hooks/auth/useLogout";
import LoadingSpinner from "./loading-spinner";

export default function Sidebar() {
  const pathName = usePathname();

  const { mutate, isPending } = useLogout();

  return (
    <div className="hidden h-full shrink-0 basis-1/5 text-neutral-100 md:block">
      <nav className="flex h-full flex-col justify-between gap-10 rounded-2xl pt-0">
        <Link href={"/"} className="flex items-center justify-center gap-3">
          <div className="-translate-y-[2px] relative h-8 w-10">
            <Image src={"/assets/img/logo-app-white.png"} alt="App Logo" fill />
          </div>
          <h1 className="whitespace-nowrap font-black text-3xl">MFlow App</h1>
        </Link>

        <div className="grow font-medium">
          {navManus.map(({ path, label, icon }) => (
            <Link
              key={path}
              href={path}
              className={`flex items-center gap-2 rounded-xl p-3 transition-colors duration-150 hover:bg-primary-400 ${pathName === path && "bg-primary-400"}`}
            >
              {icon}
              <span>{label}</span>
            </Link>
          ))}
        </div>

        <Button
          onClick={() => mutate()}
          disabled={isPending}
          variant={"ghost"}
          className="flex items-center gap-2"
        >
          {!isPending && <LogOutIcon className="size-5" />}
          <span>Log out</span>
          {isPending && <LoadingSpinner />}
        </Button>
      </nav>
    </div>
  );
}
