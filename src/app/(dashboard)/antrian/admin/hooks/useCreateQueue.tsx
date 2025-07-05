import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { Dispatch, SetStateAction } from "react";
import toast from "react-hot-toast";
import { addQueue } from "../repository/admin-queue.repository";
import { TAddQueueFormSchema } from "./useAddQueueForm";
import { IAddQueuePayload } from "@/common/models/queue.model";
import { TGender } from "@/common/models/patient.model";

export default function useCreateQueue(
  onOpenChange: Dispatch<SetStateAction<boolean>>,
) {
  const queryClient = useQueryClient();

  const { mutateAsync, isPending } = useMutation({
    mutationFn: addQueue,
    onSuccess: (data) => {
      if (data.error) {
        toast.error(data.error);
        return;
      }

      toast.success("Antrian berhasil dibuat!");
      queryClient.invalidateQueries({
        queryKey: ["admin-queue-data"],
      });
      onOpenChange(false);
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const onSubmit = (values: TAddQueueFormSchema) => {
    const {
      complaint,
      doctor_id,
      room_id,
      patient_id,
      nik,
      name,
      address,
      birth_date,
      occupation,
      phone_number,
      gender,
    } = values;

    let payload: IAddQueuePayload = {
      complaints: complaint,
      doctor_id,
      room_id,
    };

    if (patient_id) {
      payload = { ...payload, patient_id };
    } else {
      payload = {
        ...payload,
        patient_data: {
          nik,
          address,
          name,
          occupation,
          phone_number: `+62${phone_number}`,
          gender: gender as TGender,
          birth_date: (() => {
            const [day, month, year] = birth_date.split("/");
            return new Date(Number(year), Number(month) - 1, Number(day));
          })(),
        },
      };
    }

    mutateAsync(payload);
  };

  return {
    onSubmit,
    isPending,
  };
}
