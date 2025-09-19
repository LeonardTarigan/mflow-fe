import { IPatient } from "@/common/models/patient.model";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useRef, useState } from "react";
import { UseFormReturn } from "react-hook-form";
import { toast } from "react-hot-toast";
import { getPatientByMrNumber } from "../repository/patient.repository";
import { TAddQueueFormSchema } from "./useAddQueueForm";

export default function useAutofillPatientData(
  form: UseFormReturn<TAddQueueFormSchema>,
) {
  const mrInputRef = useRef<HTMLInputElement>(null);

  const [mrInput, setMrInput] = useState("");
  const [enabled, setEnabled] = useState(false);
  const [foundPatient, setFoundPatient] = useState<IPatient | null>(null);

  const { data, isSuccess, isLoading, isError } = useQuery({
    queryKey: ["patient-mr-number", mrInput],
    queryFn: () => getPatientByMrNumber(mrInput),
    enabled: enabled && !!mrInput,
    refetchOnWindowFocus: false,
  });

  const search = (input: string) => {
    setMrInput(input);
    setEnabled(true);
  };

  const formatMrNumber = (input: string): string => {
    const digits = input.replace(/\D/g, "");
    const padded = digits.padStart(6, "0").slice(-6);
    return `${padded.slice(0, 2)}.${padded.slice(2, 4)}.${padded.slice(4, 6)}`;
  };

  const onMrInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const digits = e.target.value.replace(/\D/g, "");
    setMrInput(digits);
  };

  useEffect(() => {
    if (!enabled) return;
    if (isSuccess) {
      if (data?.data) {
        const patient = data.data;
        setFoundPatient(patient);

        form.setValue("patient_id", patient.id.toString());
      } else {
        setFoundPatient(null);
        form.reset();
      }
      setEnabled(false);
    }
    if (isError) {
      toast.error("Terjadi kesalahan saat mencari pasien.");
      setEnabled(false);
    }
  }, [isSuccess, isError, data, enabled, form]);

  return {
    data,
    isLoading,
    search,
    mrInput,
    mrInputRef,
    setMrInput,
    formattedMrNumber: formatMrNumber(mrInput),
    foundPatient,
    onMrInputChange,
  };
}
