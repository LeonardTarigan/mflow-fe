import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { addSessionTreatment } from "../repository/treatment.repository";

export default function useCreateSessionTreatment() {
  const { mutateAsync, isPending } = useMutation({
    mutationFn: addSessionTreatment,
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
