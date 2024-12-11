import { zodResolver } from "@hookform/resolvers/zod";
import {
  type ChangeEvent,
  type Dispatch,
  type SetStateAction,
  useState,
} from "react";
import { type ControllerRenderProps, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { z } from "zod";

const numberFormatter = new Intl.NumberFormat("id-ID");

const formSchema = z.object({
  name: z.string().min(1, "Nama tidak boleh kosong").max(50),
  category: z.string().min(1, "Kategori tidak boleh kosong"),
  unit: z.string().min(1, "Unit tidak boleh kosong"),
  price: z.number({ invalid_type_error: "Harga harus berupa angka" }),
});

export type TDrugFormSchema = z.infer<typeof formSchema>;

export default function useDrugForm(
  onOpenChange: Dispatch<SetStateAction<boolean>>,
  defaultValues?: TDrugFormSchema,
) {
  const defaultPrice = defaultValues?.price
    ? numberFormatter.format(defaultValues?.price).toString()
    : "";

  const [formattedPrice, setFormattedPrice] = useState<string>(defaultPrice);

  const form = useForm<TDrugFormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: defaultValues ?? {
      name: "",
      category: "",
      unit: "",
      price: 0,
    },
  });

  const onSubmit = (values: TDrugFormSchema) => {
    // biome-ignore lint/suspicious/noConsoleLog: <explanation>
    console.log(values);

    toast.success("Data obat berhasil disimpan!");
    onOpenChange(false);
  };

  const onQuantityInputChange = (
    e: ChangeEvent<HTMLInputElement>,
    field: ControllerRenderProps<TDrugFormSchema>,
  ) => {
    const rawValue = e.target.value.replace(/\./g, "");
    const numberValue = Number.parseInt(rawValue, 10) || 0;
    field.onChange(numberValue);
  };

  const onPriceInputChange = (
    e: ChangeEvent<HTMLInputElement>,
    field: ControllerRenderProps<TDrugFormSchema>,
  ) => {
    const rawValue = e.target.value.replace(/\./g, "");
    const numberValue = Number.parseInt(rawValue, 10) || 0;
    setFormattedPrice(numberFormatter.format(numberValue));
    field.onChange(numberValue);
  };

  return {
    form,
    formattedPrice,
    onSubmit,
    onQuantityInputChange,
    onPriceInputChange,
  };
}
