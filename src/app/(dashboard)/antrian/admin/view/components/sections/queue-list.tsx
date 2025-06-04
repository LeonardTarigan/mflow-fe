import QueueCard from "../cards/queue-card";

export default function QueueList() {
  return (
    <section className="grow rounded-xl bg-white p-5">
      <h3 className="mb-3 text-xl font-bold">Antrian Poli Umum 1</h3>
      <div className="space-y-3">
        {[...Array(2)].map((_, index) => (
          <QueueCard key={index} status="IN_CONSULTATION" />
        ))}
        {[...Array(2)].map((_, index) => (
          <QueueCard key={index} status="WAITING_CONSULTATION" />
        ))}
        {[...Array(2)].map((_, index) => (
          <QueueCard key={index} status="WAITING_MEDICATION" />
        ))}
        {[...Array(2)].map((_, index) => (
          <QueueCard key={index} status="WAITING_PAYMENT" />
        ))}
        {[...Array(2)].map((_, index) => (
          <QueueCard key={index} status="COMPLETED" />
        ))}
      </div>
    </section>
  );
}
