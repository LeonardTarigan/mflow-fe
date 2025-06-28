import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { addSessionDrugOrder } from "../repository/drug.repository";

export default function useCreateSessionDrugOrder() {
  const { mutateAsync, isPending } = useMutation({
    mutationFn: addSessionDrugOrder,
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
