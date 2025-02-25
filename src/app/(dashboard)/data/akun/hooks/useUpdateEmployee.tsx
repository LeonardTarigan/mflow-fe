import { IUpdateEmployeePayload } from "@/common/models/employee.model";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { Dispatch, SetStateAction } from "react";
import toast from "react-hot-toast";
import { updateEmployee } from "../repository/employee.repository";
import type { TEmployeeFormSchema } from "./useEmployeeForm";

export default function useUpdateEmployee(
  id: string,
  onOpenChange: Dispatch<SetStateAction<boolean>>,
) {
  const queryClient = useQueryClient();

  const { mutateAsync, isPending } = useMutation({
    mutationFn: async ({ username, role }: TEmployeeFormSchema) => {
      const formattedPayload: IUpdateEmployeePayload = {
        username,
        role,
      };

      return updateEmployee(id, formattedPayload);
    },
    onSuccess: (data) => {
      if (data.error) {
        toast.error(data.error);

        return;
      }

      toast.success("Data karyawan berhasil disimpan!");
      queryClient.invalidateQueries({
        queryKey: ["employee-data"],
      });
      onOpenChange(false);
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const onSubmit = (values: TEmployeeFormSchema) => {
    mutateAsync(values);
  };

  return {
    onSubmit,
    isPending,
  };
}
