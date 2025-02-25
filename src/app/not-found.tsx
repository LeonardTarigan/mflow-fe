import { Button } from "@/common/components/button/button";
import { ChevronLeftIcon } from "lucide-react";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "404 | MFlow",
};

export default function NotFoundPage() {
  return (
    <main className="relative z-0 flex h-screen w-full flex-col items-center justify-center gap-10">
      <div className="absolute -z-10 h-screen w-full">
        <Image src={"/assets/img/white-waves-bg.jpg"} alt="White Waves" fill />
      </div>
      <div className="max-w-xl space-y-2 text-center">
        <h1 className="text-primary-gradient text-9xl font-black">404</h1>
        <h2 className="text-primary-gradient text-3xl font-extrabold">
          Halaman Tidak Ditemukan
        </h2>
        <p className="leading-tight">
          Maaf, halaman yang Anda cari tidak dapat ditemukan. Mungkin telah
          dipindahkan, dihapus, atau tautan yang Anda gunakan tidak valid.
        </p>
      </div>
      <Link href={"/"}>
        <Button>
          <ChevronLeftIcon />
          <span>Kembali</span>
        </Button>
      </Link>
    </main>
  );
}
