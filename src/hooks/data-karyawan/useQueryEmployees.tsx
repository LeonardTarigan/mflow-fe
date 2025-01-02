import { useQuery } from "@tanstack/react-query";
import useUrlQuery from "../shared/useUrlQuery";
import { EmployeeAPI } from "@/repository/employee-service";

export default function useQueryEmployees() {
  const { urlQuery, setUrlQuery, debouncedQuery } = useUrlQuery();

  const handleOnSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;

    setUrlQuery((prev) => ({
      ...prev,
      search: inputValue === "" ? undefined : inputValue,
      page: undefined,
    }));
  };

  const handleResetSearch = () => {
    if (urlQuery?.search) {
      setUrlQuery((prev) => ({
        ...prev,
        search: undefined,
        page: undefined,
      }));
    }
  };

  const getAllEmployees = () => {
    const res = EmployeeAPI.getAllEmployees({ ...debouncedQuery });

    return res;
  };

  const res = useQuery({
    queryKey: ["drug-data", { ...debouncedQuery }],
    queryFn: getAllEmployees,
    placeholderData: (previousData) => previousData,
  });

  return {
    res,
    urlQuery,
    setUrlQuery,
    handleOnSearchChange,
    handleResetSearch,
  };
}
