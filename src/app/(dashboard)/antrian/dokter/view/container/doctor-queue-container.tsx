import useCookiesData from "@/common/hooks/useCookiesData";
import useQueryDoctorQueue from "../../hooks/useQueryDoctorQueue";
import PatientDetail from "../components/sections/patient-detail";
import QueueList from "../components/sections/queue-list";

export default function DoctorQueueContainer() {
  const user = useCookiesData();
  const { data, isLoading, error } = useQueryDoctorQueue(user.id);

  return (
    <main className="space-y-5">
      {!data && error && (
        <p className="rounded-lg bg-error-100 p-3 font-semibold text-error-500">
          {error?.message}
        </p>
      )}
      {isLoading && (
        <div className="flex gap-5">
          <div className="h-[700px] basis-[60%] animate-pulse space-y-5 divide-y rounded-xl bg-neutral-200 p-5"></div>
          <div className="h-96 basis-[40%] animate-pulse space-y-5 divide-y rounded-xl bg-neutral-200 p-5"></div>
        </div>
      )}
      {data?.data && (
        <div className="flex gap-5">
          <PatientDetail data={data.data.current} />
          <QueueList nextQueues={data.data.next_queues ?? []} />
        </div>
      )}
    </main>
  );
}
