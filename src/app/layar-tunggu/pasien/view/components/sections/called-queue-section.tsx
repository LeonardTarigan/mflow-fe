import Image from "next/image";

export default function CalledQueueSection() {
  return (
    <section className="relative flex grow flex-col overflow-hidden rounded-xl bg-white">
      <h2 className="bg-primary-500 p-3 text-center text-3xl font-bold text-white">
        Nomor Dipanggil
      </h2>
      <div className="flex h-full grow flex-col items-center justify-center space-y-3 text-center">
        <h3 className="bg-gradient-to-r from-primary-500 to-primary-600 bg-clip-text text-9xl font-black text-transparent">
          U001
        </h3>
        <p className="text-2xl font-medium text-neutral-500">
          Silakan menuju ruang periksa
        </p>
      </div>
      <div className="absolute bottom-3 flex w-full justify-center">
        <div className="flex items-center justify-center gap-[6px] rounded-full bg-primary-500 px-4 py-2">
          <div className="relative h-4 w-5">
            <Image src={"/assets/img/logo-app-white.png"} alt="App Logo" fill />
          </div>
          <p className="font-bold text-white">Klinik Pratama Millenium</p>
        </div>
      </div>
    </section>
  );
}
