import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { addSessionDrugOrder } from "../repository/drug.repository";
import { IAddSessionDrugOrderPayload } from "@/common/models/drug.model";

export default function useCreateSessionDrugOrder() {
  const queryClient = useQueryClient();

  const { mutateAsync, isPending } = useMutation({
    mutationFn: addSessionDrugOrder,
    onSuccess: (data) => {
      if (data.error) {
        toast.error(data.error);
        return;
      }

      queryClient.invalidateQueries({ queryKey: ["doctor-session-queue"] });
      toast.success("Resep obat berhasil ditambahkan");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const onSubmit = async (payload: IAddSessionDrugOrderPayload) => {
    mutateAsync(payload);
  };

  return {
    onSubmit,
    isPending,
  };
}
