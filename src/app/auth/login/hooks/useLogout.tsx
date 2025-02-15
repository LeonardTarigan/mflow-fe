import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { logout } from "../repository/auth.repository";

export default function useLogout() {
  const router = useRouter();

  const { mutate, isPending } = useMutation({
    mutationFn: logout,
    onSuccess: (data) => {
      if (data.error) {
        toast.error(data.error);
        return;
      }

      router.push("/auth/login");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  return {
    mutate,
    isPending,
  };
}
