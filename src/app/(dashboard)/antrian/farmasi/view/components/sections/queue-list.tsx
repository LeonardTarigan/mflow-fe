import EmptyBookingGif from "@/common/components/gif/empty-booking-gif";

export default function QueueList({
  nextQueues,
}: {
  nextQueues: { id: number; queue_number: string }[];
}) {
  return (
    <section className="h-fit grow rounded-xl bg-white p-5">
      <h3 className="mb-3 text-xl font-bold">Antrian Berikutnya</h3>
      <div className="space-y-3">
        {nextQueues.length === 0 && (
          <div className="flex flex-col items-center justify-center pb-10">
            <EmptyBookingGif className="h-52" />
            <p className="text-center text-neutral-400">
              Tidak ada antrian pesanan
            </p>
          </div>
        )}
        {nextQueues.map(({ id, queue_number }) => (
          <div
            key={id}
            className="rounded-lg border border-l-4 border-l-secondary-400 p-5"
          >
            <h4 className="text-primary-gradient text-xl font-black">
              {queue_number}
            </h4>
          </div>
        ))}
      </div>
    </section>
  );
}
