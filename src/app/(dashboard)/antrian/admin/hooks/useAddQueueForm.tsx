import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

const formSchema = z.object({
  nik: z.string().min(16, "NIK harus 16 digit").max(16, "NIK harus 16 digit"),
  name: z.string().min(1, "Nama tidak boleh kosong"),
  birth_date: z
    .string()
    .min(1, "Tanggal lahir tidak boleh kosong")
    .regex(
      /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/,
      "Format tanggal lahir harus dd/mm/yyyy",
    ),
  address: z.string().min(1, "Alamat tidak boleh kosong"),
  occupation: z.string().min(1, "Pekerjaan tidak boleh kosong"),
  phone_number: z
    .string()
    .min(8, "Nomor Telepon minimal 8 digit")
    .max(13, "Nomor Telepon maksimal 13 digit")
    .regex(/^\d+$/, "Nomor Telepon hanya boleh angka"),
  complaint: z.string().min(1, "Keluhan tidak boleh kosong"),
  doctor_id: z.string().min(1, "Dokter tidak boleh kosong"),
  room_id: z.number(),
  gender: z.enum(["MALE", "FEMALE"], {
    errorMap: () => ({ message: "Jenis kelamin tidak valid" }),
  }),
  patient_id: z.string().optional(),
  email: z.string().email("Email tidak valid").optional(),
});

export type TAddQueueFormSchema = z.infer<typeof formSchema>;

export default function useAddQueueForm(defaultValues?: TAddQueueFormSchema) {
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
    },
  });

  return {
    form,
  };
}
