import { useQuery } from "@tanstack/react-query";
import { getActiveQueues } from "../repository/admin-queue.repository";
import { useSearchParams } from "next/navigation";

export default function useQueryAdminQueue() {
  const searchParams = useSearchParams();
  const roomId = searchParams.get("roomId") || undefined;

  const res = useQuery({
    queryKey: ["admin-queue-data", roomId],
    queryFn: () => getActiveQueues(roomId),
  });

  return res;
}
