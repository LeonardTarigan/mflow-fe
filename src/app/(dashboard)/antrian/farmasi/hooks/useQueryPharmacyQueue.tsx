import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getActivePharmacyQueues } from "../repository/pharmacy-queue.repository";
import { useEffect } from "react";
import { getSocket } from "@/common/lib/socket";

export default function useQueryPharmacyQueue() {
  const queryClient = useQueryClient();

  const res = useQuery({
    queryKey: ["pharmacy-queue"],
    queryFn: () => getActivePharmacyQueues(),
  });

  useEffect(() => {
    const socket = getSocket();

    socket.on("waiting_queue_update", () =>
      queryClient.invalidateQueries({ queryKey: ["pharmacy-queue"] }),
    );
  }, []);

  return res;
}
