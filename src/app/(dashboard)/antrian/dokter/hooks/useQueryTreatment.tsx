import { getAllTreatments } from "@/app/(dashboard)/data/penanganan/repository/treatment.repository";
import { useQuery } from "@tanstack/react-query";
import { useDebounce } from "@uidotdev/usehooks";
import { useState } from "react";

export default function useQueryTreatments() {
  const [searchInput, setSearchInput] = useState("");

  const debouncedInput = useDebounce(searchInput, 700);

  const handleOnSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    setSearchInput(inputValue);
  };

  const res = useQuery({
    queryKey: ["session-treatment-data", debouncedInput],
    queryFn: () => getAllTreatments(undefined, undefined, debouncedInput),
    enabled: debouncedInput !== "",
  });

  return {
    res,
    searchInput,
    setSearchInput,
    handleOnSearchChange,
  };
}
