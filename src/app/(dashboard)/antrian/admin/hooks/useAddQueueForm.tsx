import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

const formSchema = z.object({
  complaint: z.string().min(1, "Keluhan tidak boleh kosong"),
  doctor_id: z.string().min(1, "Dokter tidak boleh kosong"),
  room_id: z.number().int().positive().min(1, "Ruangan tidak boleh kosong"),
  patient_id: z.string(),
});

export type TAddQueueFormSchema = z.infer<typeof formSchema>;

export default function useAddQueueForm(defaultValues?: TAddQueueFormSchema) {
  const form = useForm<TAddQueueFormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: defaultValues ?? {
      patient_id: "",
      complaint: "",
      doctor_id: "",
    },
  });

  return form;
}
