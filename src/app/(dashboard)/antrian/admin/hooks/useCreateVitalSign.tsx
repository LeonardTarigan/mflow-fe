import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { Dispatch, SetStateAction } from "react";
import toast from "react-hot-toast";
import { addVitalSign } from "../repository/vital-sign.repository";
import { TVitalSignFormSchema } from "./useVitalSignForm";
import { IAddSessionVitalSignPayload } from "@/common/models/queue.model";

export default function useCreateVitalSign(
  queueId: number,
  onOpenChange: Dispatch<SetStateAction<boolean>>,
) {
  const queryClient = useQueryClient();

  const { mutateAsync, isPending } = useMutation({
    mutationFn: addVitalSign,
    onSuccess: (data) => {
      if (data.error) {
        toast.error(data.error);
        return;
      }

      toast.success("Data Vital Sign berhasil dibuat!");
      queryClient.invalidateQueries({
        queryKey: ["admin-queue-data"],
      });
      onOpenChange(false);
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const onSubmit = (values: TVitalSignFormSchema) => {
    const {
      height,
      weight,
      blood_pressure,
      pulse,
      respitory_rate,
      temperature,
    } = values;

    const payload: IAddSessionVitalSignPayload = {
      care_session_id: queueId,
      blood_pressure: blood_pressure,
      height_cm: height,
      weight_kg: weight,
      body_temperature_c: temperature,
      heart_rate_bpm: pulse,
      respiratory_rate_bpm: respitory_rate,
    };

    mutateAsync(payload);
  };

  return {
    onSubmit,
    isPending,
  };
}
