import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { Dispatch, SetStateAction } from "react";
import toast from "react-hot-toast";
import { deleteTreatment } from "../repository/treatment.repository";

export default function useDeleteTreatment(
  onOpenChange: Dispatch<SetStateAction<boolean>>,
) {
  const queryClient = useQueryClient();

  const { mutateAsync, isPending } = useMutation({
    mutationFn: deleteTreatment,
    onSuccess: (data) => {
      if (data.error) {
        toast.error(data.error);
        return;
      }

      toast.success("Data penanganan berhasil dihapus!");
      queryClient.invalidateQueries({
        queryKey: ["treatment-data"],
      });
      onOpenChange(false);
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
