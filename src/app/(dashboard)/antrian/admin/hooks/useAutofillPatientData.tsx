import { useQuery } from "@tanstack/react-query";
import { getPatientByMrNumber } from "../repository/patient.repository";
import { UseFormReturn } from "react-hook-form";
import { TAddQueueFormSchema } from "./useAddQueueForm";
import { useState, useEffect, useRef } from "react";
import { toast } from "react-hot-toast";
import { format } from "date-fns";

export default function useAutofillPatientData(
  form: UseFormReturn<TAddQueueFormSchema>,
) {
  const mrInputRef = useRef<HTMLInputElement>(null);

  const [mrInput, setMrInput] = useState("");
  const [enabled, setEnabled] = useState(false);

  const res = useQuery({
    queryKey: ["patient-mr-number", mrInput],
    queryFn: () => getPatientByMrNumber(mrInput),
    enabled: enabled && !!mrInput,
    refetchOnWindowFocus: false,
  });

  const search = (input: string) => {
    setMrInput(input);
    setEnabled(true);
  };

  useEffect(() => {
    if (!enabled) return;
    if (res.isSuccess) {
      if (res.data?.data) {
        const patient = res.data.data;
        form.setValue("nik", patient.nik);
        form.setValue("name", patient.name);
        form.setValue("gender", patient.gender);
        form.setValue(
          "birth_date",
          patient.birth_date
            ? format(new Date(patient.birth_date), "dd/MM/yyyy")
            : "",
        );
        form.setValue("address", patient.address);
        form.setValue("occupation", patient.occupation);
        form.setValue(
          "phone_number",
          patient.phone_number?.replace(/^\+62/, "") ?? "",
        );
        form.setValue("email", patient.email ?? "");
        form.setValue("patient_id", patient.id.toString());
      } else {
        toast.error(res.data?.error ?? "Pasien tidak ditemukan.");
        form.reset();
      }
      setEnabled(false);
    }
    if (res.isError) {
      toast.error("Terjadi kesalahan saat mencari pasien.");
      setEnabled(false);
    }
  }, [res.isSuccess, res.isError, res.data, enabled, form]);

  return { ...res, search, mrInput, mrInputRef, setMrInput };
}
