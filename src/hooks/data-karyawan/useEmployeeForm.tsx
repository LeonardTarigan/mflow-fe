import { EmployeeRoles } from "@/model/employee.model";
import { zodResolver } from "@hookform/resolvers/zod";
import type { Dispatch, SetStateAction } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { z } from "zod";

const formSchema = z.object({
  name: z.string().min(1, "Nama tidak boleh kosong"),
  role: z.enum(EmployeeRoles, {
    errorMap: () => ({ message: "Role tidak valid" }),
  }),
  email: z
    .string()
    .min(1, "Email tidak boleh kosong")
    .email("Email tidak valid"),
  phone: z.string().min(1, "Nomor Telepon tidak boleh kosong"),
});

export type TEmployeeFormSchema = z.infer<typeof formSchema>;

export default function useEmployeeForm(
  onOpenChange: Dispatch<SetStateAction<boolean>>,
  defaultValues?: TEmployeeFormSchema,
) {
  const form = useForm<TEmployeeFormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: defaultValues ?? {
      name: "",
      role: "staff",
      email: "",
      phone: "",
    },
  });

  const onSubmit = (values: TEmployeeFormSchema) => {
    // biome-ignore lint/suspicious/noConsoleLog: <explanation>
    console.log(values);

    toast.success("Data obat berhasil disimpan!");
    onOpenChange(false);
  };

  return {
    form,
    onSubmit,
  };
}
