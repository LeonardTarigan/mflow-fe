import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getActiveQueues } from "../repository/admin-queue.repository";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { getSocket } from "@/common/lib/socket";

export default function useQueryAdminQueue() {
  const queryClient = useQueryClient();
  const searchParams = useSearchParams();

  const roomId = searchParams.get("roomId") || undefined;

  const res = useQuery({
    queryKey: ["admin-queue-data", roomId],
    queryFn: () => getActiveQueues(roomId),
  });

  useEffect(() => {
    const socket = getSocket();

    socket.on("waiting_queue_update", () =>
      queryClient.invalidateQueries({ queryKey: ["admin-queue-data"] }),
    );
  }, []);

  return res;
}
