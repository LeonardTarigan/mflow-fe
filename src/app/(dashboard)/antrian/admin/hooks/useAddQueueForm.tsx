import { zodResolver } from "@hookform/resolvers/zod";
import type { Dispatch, SetStateAction } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { z } from "zod";

const formSchema = z.object({
  nik: z.string().min(16, "NIK harus 16 digit").max(16, "NIK harus 16 digit"),
  name: z.string().min(1, "Nama tidak boleh kosong"),
  birth_date: z.string(),
  address: z.string().min(1, "Alamat tidak boleh kosong"),
  occupation: z.string().min(1, "Pekerjaan tidak boleh kosong"),
  phone_number: z
    .string()
    .min(8, "Nomor Telepon minimal 8 digit")
    .max(13, "Nomor Telepon maksimal 13 digit")
    .regex(/^\d+$/, "Nomor Telepon hanya boleh angka"),
  complaint: z.string().min(1, "Keluhan tidak boleh kosong"),
  doctor_id: z.string().min(1, "Dokter tidak boleh kosong"),
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
      complaint: "",
      doctor_id: "",
      email: null,
    },
  });

  const onSubmit = (values: TAddQueueFormSchema) => {
    const fullPhoneNumber = `+62${values.phone_number}`;
    // eslint-disable-next-line no-console
    console.log({ ...values, phone_number: fullPhoneNumber });
    toast.success("Antrian berhasil ditambahkan!");
    onOpenChange(false);
  };

  return {
    form,
    onSubmit,
  };
}
