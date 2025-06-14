import { useQuery } from "@tanstack/react-query";
import { getActivePharmacyQueues } from "../repository/pharmacy-queue.repository";

export default function useQueryPharmacyQueue() {
  const res = useQuery({
    queryKey: ["pharmacy-queue-data"],
    queryFn: () => getActivePharmacyQueues(),
  });

  return res;
}
