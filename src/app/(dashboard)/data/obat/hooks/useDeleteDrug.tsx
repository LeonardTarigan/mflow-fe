import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { Dispatch, SetStateAction } from "react";
import toast from "react-hot-toast";
import { deleteDrug } from "../repository/drug.repository";

export default function useDeleteDrug(
  onOpenChange: Dispatch<SetStateAction<boolean>>
) {
  const queryClient = useQueryClient();

  const { mutateAsync, isPending } = useMutation({
    mutationFn: deleteDrug,
    onSuccess: (data) => {
      if (data.error) {
        toast.error(data.error);
        return;
      }

      toast.success("Data obat berhasil dihapus!");
      queryClient.invalidateQueries({
        queryKey: ["drug-data"],
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
