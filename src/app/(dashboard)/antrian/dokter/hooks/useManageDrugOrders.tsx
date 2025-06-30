import { IDrugOrder } from "@/common/models/drug.model";
import { useState } from "react";

export default function useManageDrugOrders() {
  const [drugOrders, setDrugOrders] = useState<IDrugOrder[]>([]);

  const addDrug = (drug: IDrugOrder) => {
    setDrugOrders((prev) => {
      if (prev.some((d) => d.id === drug.id)) return prev;
      return [...prev, drug];
    });
  };

  const removeDrug = (id: number) => {
    setDrugOrders((prev) => prev.filter((d) => d.id !== id));
  };

  return { drugOrders, addDrug, removeDrug, setDrugOrders };
}
