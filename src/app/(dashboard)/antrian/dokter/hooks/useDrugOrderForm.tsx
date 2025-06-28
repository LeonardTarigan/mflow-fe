import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

const formSchema = z.object({
  id: z.number().positive(),
  name: z.string().min(1).max(50),
  unit: z.string().min(1),
  dose: z.string().min(1, "Dosis tidak boleh kosong"),
  quantity: z.coerce.number({
    invalid_type_error: "Kuantitas harus berupa angka",
  }),
});

export type TDrugOrderFormSchema = z.infer<typeof formSchema>;

export default function useDrugOrderForm(defaultValues?: TDrugOrderFormSchema) {
  const form = useForm<TDrugOrderFormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: defaultValues ?? {
      id: 0,
      name: "",
      unit: "",
      quantity: 1,
      dose: "",
    },
  });

  return form;
}
