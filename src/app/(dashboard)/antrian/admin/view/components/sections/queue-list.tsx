import { format } from "date-fns";
import useQueryAdminQueue from "../../../hooks/useQueryAdminQueue";
import QueueCard from "../cards/queue-card";
import EmptyBookingGif from "@/common/components/gif/empty-booking-gif";

export default function QueueList() {
  const { data, isLoading, error } = useQueryAdminQueue();

  const queueData = data?.data;

  return (
    <section className="grow rounded-xl bg-white p-5">
      <h3 className="mb-3 text-xl font-bold">
        {queueData?.length ?? 0} Antrian Aktif
      </h3>
      {error && (
        <p className="rounded-lg bg-error-100 p-4 font-medium text-error-500">
          Terjadi kesalahan saat memuat data antrian. Silakan coba lagi nanti.
        </p>
      )}
      {isLoading && (
        <div className="space-y-3">
          {Array.from({ length: 5 }).map((_, index) => (
            <div
              key={index}
              className="h-48 animate-pulse rounded-lg bg-neutral-200"
            />
          ))}
        </div>
      )}
      {!isLoading && queueData && (
        <div className="space-y-3">
          {queueData?.length === 0 && (
            <div className="flex flex-col items-center justify-center">
              <EmptyBookingGif className="size-60" />
              <p className="font-medium text-neutral-400">
                Tidak ada antrian aktif saat ini
              </p>
            </div>
          )}
          {queueData?.map(
            ({
              created_at,
              id,
              doctor,
              patient,
              room,
              status,
              queue_number,
              vital_sign,
            }) => (
              <QueueCard
                key={id}
                status={status}
                patientName={patient.name}
                patientId={patient.id}
                doctorName={doctor.username}
                roomName={room.name}
                queueNumber={queue_number}
                queueId={id}
                date={format(new Date(created_at), "dd MMM yyyy, HH:MM")}
                vitalSign={vital_sign}
              />
            ),
          )}
        </div>
      )}
    </section>
  );
}
