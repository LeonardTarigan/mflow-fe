import { DrugAPI } from "@/repository/drug-service";
import { useQuery } from "@tanstack/react-query";
import useUrlQuery from "../shared/useUrlQuery";

export default function useQueryDrugs() {
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

  const getAllDrugs = () => {
    const res = DrugAPI.getAllDrugs({ ...debouncedQuery });

    return res;
  };

  const res = useQuery({
    queryKey: ["drug-data", { ...debouncedQuery }],
    queryFn: getAllDrugs,
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
