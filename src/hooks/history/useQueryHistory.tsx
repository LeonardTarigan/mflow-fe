import { HistoryAPI } from "@/repository/history-service";
import { useQuery } from "@tanstack/react-query";
import useUrlQuery from "../shared/useUrlQuery";

export default function useQueryHistory() {
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

  const getAllHistory = () => {
    const res = HistoryAPI.getAllHistory({ ...debouncedQuery });

    return res;
  };

  const res = useQuery({
    queryKey: ["history-data", { ...debouncedQuery }],
    queryFn: getAllHistory,
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
