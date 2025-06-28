import { getAllDrugs } from "@/app/(dashboard)/data/obat/repository/drug.repository";
import { useQuery } from "@tanstack/react-query";
import { useDebounce } from "@uidotdev/usehooks";
import { useState } from "react";

export default function useQueryDrugs() {
  const [searchInput, setSearchInput] = useState("");

  const debouncedInput = useDebounce(searchInput, 700);

  const handleOnSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    setSearchInput(inputValue);
  };

  const res = useQuery({
    queryKey: ["session-drug-data", debouncedInput],
    queryFn: () => getAllDrugs(undefined, undefined, debouncedInput),
    enabled: debouncedInput !== "",
  });

  return {
    res,
    searchInput,
    setSearchInput,
    handleOnSearchChange,
  };
}
