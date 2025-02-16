import convertObjectArrayToExcelBlob from "@/common/helpers/convertObjectArrayToExcel";
import downloadBlobFile from "@/common/helpers/downloadBlobFile";
import { useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { getAllDrugs } from "../repository/drug.repository";

export default function useExportDrugData() {
  const { refetch, isFetching } = useQuery({
    queryKey: ["export-drug-data"],
    queryFn: () => getAllDrugs(),
    enabled: false,
  });

  const exportToExcel = async () => {
    const { data: fetchedData } = await refetch();

    if (fetchedData?.error) {
      toast.error(fetchedData.error);
      return;
    }

    if (!fetchedData?.data?.length) return;

    const drugs = fetchedData.data.map(
      ({ id, name, price, unit, amount_sold }) => ({
        ID: id,
        Nama: name,
        Harga: price,
        Unit: unit,
        Terjual: amount_sold,
      })
    );

    const blob = convertObjectArrayToExcelBlob(drugs);

    downloadBlobFile(blob, "Data Obat Millenium.xlsx");
  };

  return { exportToExcel, isFetching };
}
