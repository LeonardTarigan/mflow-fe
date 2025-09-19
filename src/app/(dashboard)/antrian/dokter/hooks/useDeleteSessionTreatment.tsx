import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { deleteSessionTreatment } from "../repository/treatment.repository";

export default function useDeleteSessionTreatment() {
  const queryClient = useQueryClient();

  const { mutateAsync, isPending } = useMutation({
    mutationFn: deleteSessionTreatment,
    onSuccess: (data) => {
      if (data.error) {
        toast.error(data.error);

        return;
      }

      toast.success("Data penanganan berhasil dihapus");
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
