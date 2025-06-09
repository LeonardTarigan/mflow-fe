import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

const formSchema = z.object({
  height: z.coerce.number({ invalid_type_error: "Tinggi harus berupa angka" }),
  weight: z.coerce.number({ invalid_type_error: "Berat harus berupa angka" }),
  temperature: z.coerce.number({
    invalid_type_error: "Suhu harus berupa angka",
  }),
  blood_pressure: z.string().regex(/^\d{2,3}\/\d{2,3}$/, {
    message: "Format tekanan darah harus [sistolik]/[diastolik] (misal 120/80)",
  }),
  waist_size: z.coerce.number({
    invalid_type_error: "Lingkar pinggang harus berupa angka",
  }),
  pulse: z.coerce.number({
    invalid_type_error: "Denyut jantung harus berupa angka",
  }),
  respitory_rate: z.coerce.number({
    invalid_type_error: "Frekuensi pernafasan harus berupa angka",
  }),
});

export type TVitalSignFormSchema = z.infer<typeof formSchema>;

export default function useVitalSignForm() {
  const form = useForm<TVitalSignFormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      height: 0,
      weight: 0,
      temperature: 0,
      blood_pressure: "",
      waist_size: 0,
      pulse: 0,
      respitory_rate: 0,
    },
  });

  return {
    form,
  };
}
