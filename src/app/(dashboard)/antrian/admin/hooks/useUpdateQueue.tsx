import { IUpdateQueuePayload } from "@/common/models/queue.model";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { updateQueue } from "../repository/admin-queue.repository";

export default function useUpdateQueue(id: number) {
  const queryClient = useQueryClient();

  const { mutateAsync, isPending } = useMutation({
    mutationFn: async (payload: IUpdateQueuePayload) => {
      return updateQueue(id, payload);
    },
    onSuccess: (data) => {
      if (data.error) {
        toast.error(data.error);

        return;
      }

      toast.success("Antrian berhasil dilanjutkan!");
      queryClient.invalidateQueries({
        queryKey: ["admin-queue-data", "pharmacy-queue-data"],
      });
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  return {
    mutateAsync,
    isPending,
  };
}
