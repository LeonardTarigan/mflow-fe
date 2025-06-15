import { useQuery } from "@tanstack/react-query";
import { getActiveDoctorQueues } from "../repository/doctor-queue.repository";

export default function useQueryDoctorQueue(id: string) {
  const res = useQuery({
    queryKey: ["doctor-queue-data", id],
    queryFn: () => getActiveDoctorQueues(id),
    enabled: Boolean(id),
  });

  return res;
}
