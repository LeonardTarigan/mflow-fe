import { format } from "date-fns";
import useQueryAdminQueue from "../../../hooks/useQueryAdminQueue";
import QueueCard from "../cards/queue-card";

export default function QueueList() {
  const { res } = useQueryAdminQueue();

  return (
    <section className="grow rounded-xl bg-white p-5">
      <h3 className="mb-3 text-xl font-bold">Antrian Poli Umum 1</h3>
      <div className="space-y-3">
        {res.data?.data?.map(
          ({ created_at, id, doctor, patient, room, status, queue_number }) => (
            <QueueCard
              key={id}
              status={status}
              patientName={patient.name}
              patientId={patient.id}
              doctorName={doctor.username}
              roomName={room.name}
              queueNumber={queue_number}
              date={format(new Date(created_at), "dd MMM yyyy, HH:MM")}
            />
          ),
        )}
      </div>
    </section>
  );
}
