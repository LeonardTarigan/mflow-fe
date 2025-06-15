import { getSocket } from "@/common/lib/socket";
import { IWaitingQueue } from "@/common/models/queue.model";
import { useEffect, useState } from "react";
import { getAllWaitingQueue } from "../../../repository/waiting-screen.repository";

export default function WaitingQueueSection() {
  const [waitingQueues, setWaitingQueues] = useState<IWaitingQueue[]>([]);

  const fetchWaitingQueue = async () => {
    const queue = await getAllWaitingQueue();
    if (queue.data) {
      setWaitingQueues(queue.data);
    }
  };

  useEffect(() => {
    const socket = getSocket();

    fetchWaitingQueue();

    socket.on("waiting_queue_update", (data) => {
      setWaitingQueues(data);
    });

    return () => {
      socket.off("waiting_queue_update");
    };
  }, []);

  return (
    <section className="flex basis-1/4 flex-col gap-3">
      <div className="flex h-full flex-col overflow-hidden rounded-xl bg-white">
        <h2 className="bg-amber-500 p-3 text-center text-2xl font-bold text-white">
          Menunggu
        </h2>
        <div className="flex h-full grow flex-col divide-y overflow-hidden">
          {waitingQueues.map(({ id, queue_number }) => (
            <div key={id} className="p-3 text-xl font-semibold">
              {queue_number}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
