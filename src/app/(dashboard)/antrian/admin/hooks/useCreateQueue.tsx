import { IAddQueuePayload } from "@/common/models/queue.model";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { Dispatch, SetStateAction } from "react";
import toast from "react-hot-toast";
import { addQueue } from "../repository/admin-queue.repository";
import { TAddQueueFormSchema } from "./useAddQueueForm";

export default function useCreateQueue(
  onOpenChange: Dispatch<SetStateAction<boolean>>,
) {
  const queryClient = useQueryClient();

  const { mutateAsync, isPending } = useMutation({
    mutationFn: addQueue,
    onSuccess: (data) => {
      if (data.error) {
        toast.error(data.error);
        return;
      }

      toast.success("Antrian berhasil dibuat!");
      queryClient.invalidateQueries({
        queryKey: ["admin-queue-data"],
      });
      onOpenChange(false);
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const onSubmit = (values: TAddQueueFormSchema) => {
    const { complaint, ...res } = values;

    const payload: IAddQueuePayload = {
      complaints: complaint,
      ...res,
    };

    mutateAsync(payload);
  };

  return {
    onSubmit,
    isPending,
  };
}
