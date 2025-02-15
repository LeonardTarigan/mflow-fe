import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { Dispatch, SetStateAction } from "react";
import toast from "react-hot-toast";
import { deleteEmployee } from "../repository/employee.repository";

export default function useDeleteEmployee(
  onOpenChange: Dispatch<SetStateAction<boolean>>
) {
  const queryClient = useQueryClient();

  const { mutateAsync, isPending } = useMutation({
    mutationFn: deleteEmployee,
    onSuccess: (data) => {
      if (data.error) {
        toast.error(data.error);
        return;
      }

      toast.success("Data karyawan berhasil dihapus!");
      queryClient.invalidateQueries({
        queryKey: ["employee-data"],
      });
      onOpenChange(false);
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
