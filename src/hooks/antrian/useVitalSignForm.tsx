import { zodResolver } from "@hookform/resolvers/zod";
import type { Dispatch, SetStateAction } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { z } from "zod";

const formSchema = z.object({
  height: z.number({ invalid_type_error: "Tinggi harus berupa angka" }),
  weight: z.number({ invalid_type_error: "Berat harus berupa angka" }),
  temperature: z.number({ invalid_type_error: "Suhu harus berupa angka" }),
  blood_pressure: z.number({
    invalid_type_error: "Tekanan darah harus berupa angka",
  }),
  waist_size: z.number({
    invalid_type_error: "Lingkar pinggang harus berupa angka",
  }),
  pulse: z.number({ invalid_type_error: "Denyut jantung harus berupa angka" }),
  respitory_rate: z.number({
    invalid_type_error: "Frekuensi pernafasan harus berupa angka",
  }),
});

export type TVitalSignFormSchema = z.infer<typeof formSchema>;

export default function useVitalSignForm(
  onOpenChange: Dispatch<SetStateAction<boolean>>,
) {
  const form = useForm<TVitalSignFormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      height: 0,
      weight: 0,
      temperature: 0,
      blood_pressure: 0,
      waist_size: 0,
      pulse: 0,
      respitory_rate: 0,
    },
  });

  const onSubmit = (values: TVitalSignFormSchema) => {
    // biome-ignore lint/suspicious/noConsoleLog: <explanation>
    console.log(values);

    toast.success("Data vital sign berhasil ditambahkan!");
    onOpenChange(false);
  };

  return {
    form,
    onSubmit,
  };
}
