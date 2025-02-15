import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { Dispatch, SetStateAction } from "react";
import toast from "react-hot-toast";
import { updateDrug } from "../repository/drug.repository";
import type { TDrugFormSchema } from "./useDrugForm";

export default function useUpdateDrug(
  id: number,
  onOpenChange: Dispatch<SetStateAction<boolean>>
) {
  const queryClient = useQueryClient();

  const { mutateAsync, isPending } = useMutation({
    mutationFn: async (payload: TDrugFormSchema) => {
      return updateDrug(id, payload);
    },
    onSuccess: (data) => {
      if (data.error) {
        toast.error(data.error);

        return;
      }

      toast.success("Data obat berhasil disimpan!");
      queryClient.invalidateQueries({
        queryKey: ["drug-data"],
      });
      onOpenChange(false);
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const onSubmit = (values: TDrugFormSchema) => {
    mutateAsync(values);
  };

  return {
    onSubmit,
    isPending,
  };
}
