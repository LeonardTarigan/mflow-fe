import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { Dispatch, SetStateAction } from "react";
import toast from "react-hot-toast";
import { updateTreatment } from "../repository/treatment.repository";
import { TTreatmentFormSchema } from "./useTreatmentForm";

export default function useUpdateTreatment(
  id: number,
  onOpenChange: Dispatch<SetStateAction<boolean>>,
) {
  const queryClient = useQueryClient();

  const { mutateAsync, isPending } = useMutation({
    mutationFn: async (payload: TTreatmentFormSchema) => {
      return updateTreatment(id, payload);
    },
    onSuccess: (data) => {
      if (data.error) {
        toast.error(data.error);

        return;
      }

      toast.success("Data penanganan berhasil disimpan!");
      queryClient.invalidateQueries({
        queryKey: ["treatment-data"],
      });
      onOpenChange(false);
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const onSubmit = (values: TTreatmentFormSchema) => {
    mutateAsync(values);
  };

  return {
    onSubmit,
    isPending,
  };
}
