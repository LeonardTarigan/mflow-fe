import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { deleteSessionDiagnosis } from "../repository/diagnosis.repository";

export default function useDeleteSessionDiagnosis() {
  const queryClient = useQueryClient();

  const res = useMutation({
    mutationFn: deleteSessionDiagnosis,
    onSuccess: (data) => {
      if (data.error) {
        toast.error(data.error);
        return;
      }

      queryClient.invalidateQueries({
        queryKey: ["doctor-session-queue"],
      });
      toast.success("Diagnosis berhasil dihapus");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  return res;
}
