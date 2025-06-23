import { useQuery } from "@tanstack/react-query";
import { useDebounce } from "@uidotdev/usehooks";
import { useState } from "react";
import { getAllDiagnoses } from "../repository/diagnosis.repository";

export default function useQueryDiagnosis() {
  const [searchInput, setSearchInput] = useState("");

  const debouncedInput = useDebounce(searchInput, 700);

  const handleOnSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    setSearchInput(inputValue);
  };

  const res = useQuery({
    queryKey: ["diagnosis-data", debouncedInput],
    queryFn: () => getAllDiagnoses(debouncedInput),
  });

  return {
    res,
    searchInput,
    setSearchInput,
    handleOnSearchChange,
  };
}
