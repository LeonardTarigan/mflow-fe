import { zodResolver } from "@hookform/resolvers/zod";
import { ChangeEvent, useState } from "react";
import { ControllerRenderProps, useForm } from "react-hook-form";
import { z } from "zod";

const numberFormatter = new Intl.NumberFormat("id-ID");

const formSchema = z.object({
  name: z.string().min(1, "Nama tidak boleh kosong").max(50),
  price: z.coerce.number().min(0, "Harga tidak boleh kurang dari 0"),
});

export type TTreatmentFormSchema = z.infer<typeof formSchema>;

export default function useTreatmentForm(defaultValues?: TTreatmentFormSchema) {
  const defaultPrice = defaultValues?.price
    ? numberFormatter.format(defaultValues?.price).toString()
    : "";

  const [formattedPrice, setFormattedPrice] = useState<string>(defaultPrice);

  const form = useForm<TTreatmentFormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: defaultValues ?? {
      name: "",
      price: 0,
    },
  });

  const onPriceInputChange = (
    e: ChangeEvent<HTMLInputElement>,
    field: ControllerRenderProps<TTreatmentFormSchema>,
  ) => {
    const rawValue = e.target.value.replace(/\./g, "");
    const numberValue = Number.parseInt(rawValue, 10) || 0;
    setFormattedPrice(numberFormatter.format(numberValue));
    field.onChange(numberValue);
  };

  return {
    form,
    formattedPrice,
    onPriceInputChange,
  };
}
