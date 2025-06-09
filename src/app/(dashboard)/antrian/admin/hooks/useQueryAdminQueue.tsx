import { useQuery } from "@tanstack/react-query";
import { getActiveQueues } from "../repository/admin-queue.repository";

export default function useQueryAdminQueue() {
  const res = useQuery({
    queryKey: ["admin-queue-data"],
    queryFn: () => getActiveQueues(),
  });

  return res;
}
