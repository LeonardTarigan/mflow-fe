import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

const formSchema = z.object({
  name: z.string().min(1, "Nama tidak boleh kosong").max(50),
});

export type TRoomFormSchema = z.infer<typeof formSchema>;

export default function useRoomForm(defaultValues?: TRoomFormSchema) {
  const form = useForm<TRoomFormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: defaultValues ?? {
      name: "",
    },
  });

  return form;
}
