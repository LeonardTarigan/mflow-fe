export default function WaitingQueueSection() {
  return (
    <section className="flex basis-1/4 flex-col gap-3">
      <div className="flex h-full flex-col overflow-hidden rounded-xl bg-white">
        <h2 className="bg-amber-500 p-3 text-center text-2xl font-bold text-white">
          Menunggu
        </h2>
        <div className="flex h-full grow flex-col divide-y overflow-hidden">
          {[...Array(25)].map((_, index) => (
            <div key={index} className="p-3 text-xl font-semibold">
              U002
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
