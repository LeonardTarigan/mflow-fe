import { useState } from "react";

export interface IDiagnosis {
  id: string;
  name: string;
}

export default function useManageDiagnoses() {
  const [diagnoses, setDiagnoses] = useState<IDiagnosis[]>([]);

  const addDiagnosis = (diagnosis: IDiagnosis) => {
    setDiagnoses((prev) => {
      if (prev.some((d) => d.id === diagnosis.id)) return prev;
      return [...prev, diagnosis];
    });
  };

  const removeDiagnosis = (id: string) => {
    setDiagnoses((prev) => prev.filter((d) => d.id !== id));
  };

  return { diagnoses, addDiagnosis, removeDiagnosis, setDiagnoses };
}
