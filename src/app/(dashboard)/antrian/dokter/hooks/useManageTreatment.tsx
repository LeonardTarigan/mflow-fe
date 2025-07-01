import { ICareSessionTreatment } from "@/common/models/treatment.model";
import { useState } from "react";

export default function useManageTreatments() {
  const [treatments, setTreatments] = useState<ICareSessionTreatment[]>([]);

  const addTreatment = (drug: ICareSessionTreatment) => {
    setTreatments((prev) => {
      if (prev.some((d) => d.id === drug.id)) return prev;
      return [...prev, drug];
    });
  };

  const removeTreatment = (id: number) => {
    setTreatments((prev) => prev.filter((d) => d.id !== id));
  };

  return { treatments, addTreatment, removeTreatment, setTreatments };
}
