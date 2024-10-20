import { zodResolver } from "@hookform/resolvers/zod";
import type { Dispatch, SetStateAction } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { z } from "zod";

const formSchema = z.object({
  name: z.string().min(1, "Nama tidak boleh kosong"),
  birth_date: z.string(),
  address: z.string().min(1, "Alamat tidak boleh kosong"),
  occupation: z.string().min(1, "Pekerjaan tidak boleh kosong"),
  phone_number: z.string().min(1, "Nomor Telepon tidak boleh kosong"),
  email: z
    .string()
    .min(1, "Email tidak boleh kosong")
    .email("Email tidak valid"),
});

export type TPatientFormSchema = z.infer<typeof formSchema>;

export default function usePatientForm(
  onOpenChange: Dispatch<SetStateAction<boolean>>,
  defaultValues?: TPatientFormSchema,
) {
  const form = useForm<TPatientFormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: defaultValues ?? {
      name: "",
      address: "",
      birth_date: "",
      occupation: "",
      email: "",
      phone_number: "",
    },
  });

  const onSubmit = (values: TPatientFormSchema) => {
    // biome-ignore lint/suspicious/noConsoleLog: <explanation>
    console.log(values);

    toast.success("Data pasien berhasil disimpan!");
    onOpenChange(false);
  };

  return {
    form,
    onSubmit,
  };
}
