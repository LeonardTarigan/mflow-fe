import { IPatient, TGender } from "@/common/models/patient.model";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { createPatient } from "../repository/patient.repository";
import { TAddPatientFormSchema } from "./useAddPatientForm";
import { UseFormReturn } from "react-hook-form";
import { TAddQueueFormSchema } from "./useAddQueueForm";
import { useState } from "react";

export default function useCreatePatient(
  queueForm: UseFormReturn<TAddQueueFormSchema>,
) {
  const [createdPatient, setCreatedPatient] = useState<IPatient | null>(null);

  const { mutateAsync, isPending } = useMutation({
    mutationFn: createPatient,
    onSuccess: (data) => {
      if (data.error) {
        toast.error(data.error);
        return;
      }

      if (data.data?.id) {
        queueForm.setValue("patient_id", data.data.id);
        setCreatedPatient(data.data);
        toast.success("Registrasi pasien berhasil!");
      }
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const onSubmit = (values: TAddPatientFormSchema) => {
    const { nik, name, address, birth_date, occupation, phone_number, gender } =
      values;

    const payload = {
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
    };

    mutateAsync(payload);
  };

  return {
    onSubmit,
    isPending,
    createdPatient,
  };
}
