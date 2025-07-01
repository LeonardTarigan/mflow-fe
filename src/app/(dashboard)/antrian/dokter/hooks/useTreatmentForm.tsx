import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

const formSchema = z.object({
  id: z.number().positive(),
  name: z.string().min(1).max(50),
  quantity: z.coerce.number({
    invalid_type_error: "Kuantitas harus berupa angka",
  }),
  price: z.number().positive(),
});

export type TSessionTreatmentFormSchema = z.infer<typeof formSchema>;

export default function useTreatmentForm(
  defaultValues?: TSessionTreatmentFormSchema,
) {
  const form = useForm<TSessionTreatmentFormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: defaultValues ?? {
      id: 0,
      name: "",
      quantity: 1,
      price: 0,
    },
  });

  return form;
}
