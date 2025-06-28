import { IDrugOrder } from "@/common/models/drug.model";
import { useState } from "react";
import toast from "react-hot-toast";

export default function useManageDrugOrders() {
  const [drugOrders, setDrugOrders] = useState<IDrugOrder[]>([]);

  const addDrug = (drug: IDrugOrder) => {
    setDrugOrders((prev) => {
      if (prev.some((d) => d.id === drug.id)) return prev;
      return [...prev, drug];
    });

    toast.success(`Obat berhasil ditambahkan ke resep`, {
      duration: 4000,
    });
  };

  const removeDrug = (id: number) => {
    setDrugOrders((prev) => prev.filter((d) => d.id !== id));
  };

  return { drugOrders, addDrug, removeDrug };
}
