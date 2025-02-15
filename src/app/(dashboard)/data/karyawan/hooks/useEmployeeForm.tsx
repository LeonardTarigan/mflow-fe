import { EMPLOYEE_ROLES } from "@/common/models/employee.model";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

const formSchema = z.object({
  name: z.string().min(1, "Nama tidak boleh kosong"),
  role: z.enum(EMPLOYEE_ROLES, {
    errorMap: () => ({ message: "Role tidak valid" }),
  }),
  email: z
    .string()
    .min(1, "Email tidak boleh kosong")
    .email("Format email tidak valid"),
  phone: z.string().min(1, "Nomor Telepon tidak boleh kosong"),
});

export type TEmployeeFormSchema = z.infer<typeof formSchema>;

export default function useEmployeeForm(defaultValues?: TEmployeeFormSchema) {
  const form = useForm<TEmployeeFormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: defaultValues ?? {
      name: "",
      role: "STAFF",
      email: "",
      phone: "",
    },
  });

  return form;
}
