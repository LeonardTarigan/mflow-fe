import { useQuery } from "@tanstack/react-query";
import useUrlQuery from "../shared/useUrlQuery";
import { PatientAPI } from "@/repository/patient-service";

export default function useQueryPatients() {
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

  const getAllPatients = () => {
    const res = PatientAPI.getAllPatients({ ...debouncedQuery });

    return res;
  };

  const res = useQuery({
    queryKey: ["drug-data", { ...debouncedQuery }],
    queryFn: getAllPatients,
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
