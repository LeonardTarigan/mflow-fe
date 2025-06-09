import { getAllEmployees } from "@/app/(dashboard)/data/akun/repository/employee.repository";
import { useQuery } from "@tanstack/react-query";

export default function useQueryDoctors() {
  const res = useQuery({
    // eslint-disable-next-line @tanstack/query/exhaustive-deps
    queryKey: ["employee-data"],
    queryFn: () => getAllEmployees(undefined, undefined, "dr"),
  });

  return {
    res,
  };
}
