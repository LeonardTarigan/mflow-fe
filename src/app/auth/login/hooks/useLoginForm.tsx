import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { z } from "zod";
import { login } from "../repository/auth.repository";

const formSchema = z.object({
  email: z.string().email("Format email tidak valid"),
  password: z.string().min(1, "Password tidak boleh kosong"),
});

export type TLoginFormSchema = z.infer<typeof formSchema>;

export default function useLoginForm() {
  const router = useRouter();

  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const form = useForm<TLoginFormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const { mutateAsync, isPending } = useMutation({
    mutationFn: login,
    onSuccess: (data) => {
      if (data.error) {
        setErrorMsg(data.error);
        return;
      }

      setErrorMsg(null);

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
    errorMsg,
    isPending,
    showPassword,
    togglePasswordVisibility,
  };
}
