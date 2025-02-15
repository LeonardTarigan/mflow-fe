import { useQuery } from "@tanstack/react-query";
import { getAllDrugs } from "../repository/drug.repository";
import useUrlQuery from "@/common/hooks/useUrlQuery";

export default function useQueryDrugs() {
  const { urlQuery, setUrlQuery, debouncedQuery, isInitialized } =
    useUrlQuery();

  const handleOnSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    setUrlQuery((prev) => ({
      ...prev,
      search: inputValue === "" ? undefined : inputValue,
      page: 1,
    }));
  };

  const handleResetSearch = () => {
    if (urlQuery?.search) {
      setUrlQuery((prev) => ({
        ...prev,
        search: undefined,
        page: 1,
      }));
    }
  };

  const res = useQuery({
    // eslint-disable-next-line @tanstack/query/exhaustive-deps
    queryKey: [
      "drug-data",
      isInitialized ? debouncedQuery.page : urlQuery.page,
      isInitialized ? debouncedQuery.search : urlQuery.search,
    ],
    queryFn: () =>
      getAllDrugs(
        isInitialized ? debouncedQuery.page : urlQuery.page,
        isInitialized ? debouncedQuery.search : urlQuery.search
      ),
    placeholderData: (prev) => prev,
    refetchOnWindowFocus: false,
    staleTime: 1000 * 60 * 5,
    enabled: true,
  });

  return {
    res,
    urlQuery,
    setUrlQuery,
    handleOnSearchChange,
    handleResetSearch,
  };
}
