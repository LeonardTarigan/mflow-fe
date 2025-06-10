export default function QueueList() {
  return (
    <section className="h-fit grow rounded-xl bg-white p-5">
      <h3 className="mb-3 text-xl font-bold">Antrian Berikutnya</h3>
      <div className="space-y-3">
        {[...Array(5)].map((_, index) => (
          <div
            key={index}
            className="rounded-lg border border-l-4 border-l-yellow-400 p-5"
          >
            <h4 className="text-primary-gradient text-xl font-black">
              U00{index + 4}
            </h4>
          </div>
        ))}
      </div>
    </section>
  );
}
