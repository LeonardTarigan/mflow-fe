import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { deleteSessionDrugOrder } from "../repository/drug.repository";

export default function useDeleteSessionDrugOrder() {
  const queryClient = useQueryClient();

  const { mutateAsync, isPending } = useMutation({
    mutationFn: deleteSessionDrugOrder,
    onSuccess: (data) => {
      if (data.error) {
        toast.error(data.error);

        return;
      }

      toast.success("Data resep obat berhasil dihapus");
      queryClient.invalidateQueries({
        queryKey: ["doctor-session-queue"],
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
