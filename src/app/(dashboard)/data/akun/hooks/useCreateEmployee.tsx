import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { Dispatch, SetStateAction } from "react";
import toast from "react-hot-toast";
import { addEmployee } from "../repository/employee.repository";
import { TEmployeeFormSchema } from "./useEmployeeForm";

export default function useCreateEmployee(
  onOpenChange: Dispatch<SetStateAction<boolean>>
) {
  const queryClient = useQueryClient();

  const { mutateAsync, isPending } = useMutation({
    mutationFn: addEmployee,
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
