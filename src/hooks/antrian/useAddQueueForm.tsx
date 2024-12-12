import { zodResolver } from "@hookform/resolvers/zod";
import type { Dispatch, SetStateAction } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { z } from "zod";

const formSchema = z.object({
  nik: z
    .string()
    .min(1, "NIK tidak boleh kosong")
    .max(16, "NIK tidak bole lebih dari 16 digit"),
  name: z.string().min(1, "Nama tidak boleh kosong"),
  birth_date: z.string(),
  address: z.string().min(1, "Alamat tidak boleh kosong"),
  occupation: z.string().min(1, "Pekerjaan tidak boleh kosong"),
  phone_number: z.string().min(1, "Nomor Telepon tidak boleh kosong"),
  email: z.string().email("Email tidak valid").nullable(),
});

export type TAddQueueFormSchema = z.infer<typeof formSchema>;

export default function useAddQueueForm(
  onOpenChange: Dispatch<SetStateAction<boolean>>,
  defaultValues?: TAddQueueFormSchema,
) {
  const form = useForm<TAddQueueFormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: defaultValues ?? {
      nik: "",
      name: "",
      birth_date: "",
      address: "",
      occupation: "",
      phone_number: "",
      email: null,
    },
  });

  const onSubmit = (values: TAddQueueFormSchema) => {
    // biome-ignore lint/suspicious/noConsoleLog: <explanation>
    console.log(values);

    toast.success("Antrian berhasil ditambahkan!");
    onOpenChange(false);
  };

  return {
    form,
    onSubmit,
  };
}
