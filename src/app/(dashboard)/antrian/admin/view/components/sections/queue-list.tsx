import QueueCard from "../cards/queue-card";

export default function QueueList() {
  return (
    <section className="grow rounded-xl bg-white p-5">
      <h3 className="mb-3 text-xl font-bold">Antrian Poli Umum 1</h3>
      <div className="space-y-3">
        {[...Array(2)].map((_, index) => (
          <QueueCard key={index} status="in-constultation" />
        ))}
        {[...Array(2)].map((_, index) => (
          <QueueCard key={index} status="waiting-consultation" />
        ))}
        {[...Array(2)].map((_, index) => (
          <QueueCard key={index} status="waiting-prescription" />
        ))}
        {[...Array(2)].map((_, index) => (
          <QueueCard key={index} status="waiting-payment" />
        ))}
        {[...Array(2)].map((_, index) => (
          <QueueCard key={index} status="completed" />
        ))}
      </div>
    </section>
  );
}
