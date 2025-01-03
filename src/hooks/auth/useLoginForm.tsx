import { login } from "@/repository/auth.repository";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { z } from "zod";

const formSchema = z.object({
  nip: z.string().min(1, "NIP tidak boleh kosong"),
  password: z.string().min(1, "Password tidak boleh kosong"),
});

export type TLoginFormSchema = z.infer<typeof formSchema>;

export default function useLoginForm() {
  const router = useRouter();

  const [showError, setShowError] = useState(false);

  const form = useForm<TLoginFormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      nip: "",
      password: "",
    },
  });

  const { mutateAsync, isPending } = useMutation({
    mutationFn: login,
    onSuccess: (data) => {
      if (data.error) {
        setShowError(true);
        return;
      }

      setShowError(false);

      router.push("/");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const onSubmit = async (values: TLoginFormSchema) => {
    await mutateAsync(values);
  };

  return {
    form,
    onSubmit,
    showError,
    isPending,
  };
}
