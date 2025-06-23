import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { addSessionDiagnosis } from "../repository/diagnosis.repository";

export default function useCreateSessionDiagnosis() {
  const { mutateAsync, isPending } = useMutation({
    mutationFn: addSessionDiagnosis,
    onSuccess: (data) => {
      if (data.error) {
        toast.error(data.error);
        return;
      }
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
