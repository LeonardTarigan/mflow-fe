import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { addSessionTreatment } from "../repository/treatment.repository";
import { IAddCareSessionTreatmentPayload } from "@/common/models/treatment.model";

export default function useCreateSessionTreatment() {
  const queryClient = useQueryClient();

  const { mutateAsync, isPending } = useMutation({
    mutationFn: addSessionTreatment,
    onSuccess: (data) => {
      if (data.error) {
        toast.error(data.error);
        return;
      }

      queryClient.invalidateQueries({ queryKey: ["doctor-session-queue"] });
      toast.success("Penanganan berhasil ditambahkan");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const onSubmit = async (payload: IAddCareSessionTreatmentPayload) => {
    mutateAsync(payload);
  };

  return {
    onSubmit,
    isPending,
  };
}
