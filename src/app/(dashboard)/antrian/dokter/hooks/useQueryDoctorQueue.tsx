import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getActiveDoctorQueues } from "../repository/doctor-queue.repository";
import { getSocket } from "@/common/lib/socket";
import { useEffect } from "react";

export default function useQueryDoctorQueue(id: string) {
  const queryClient = useQueryClient();

  const res = useQuery({
    queryKey: ["doctor-session-queue", id],
    queryFn: () => getActiveDoctorQueues(id),
    enabled: Boolean(id),
  });

  useEffect(() => {
    const socket = getSocket();

    socket.on("waiting_queue_update", () =>
      queryClient.invalidateQueries({ queryKey: ["doctor-session-queue", id] }),
    );
  }, []);

  return res;
}
