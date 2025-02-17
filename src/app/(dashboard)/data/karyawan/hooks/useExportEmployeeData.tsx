import convertObjectArrayToExcelBlob from "@/common/helpers/convertObjectArrayToExcel";
import downloadBlobFile from "@/common/helpers/downloadBlobFile";
import { useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { getAllEmployees } from "../repository/employee.repository";

export default function useExportEmployeeData() {
  const { refetch, isFetching } = useQuery({
    queryKey: ["export-employee-data"],
    queryFn: () => getAllEmployees(),
    enabled: false,
  });

  const exportToExcel = async () => {
    const { data: fetchedData } = await refetch();

    if (fetchedData?.error) {
      toast.error(fetchedData.error);
      return;
    }

    if (!fetchedData?.data?.length) return;

    const employees = fetchedData.data.map(
      ({ id, nip, name, email, phone, role }) => ({
        ID: id,
        NIP: nip,
        Nama: name,
        Email: email,
        "No. Telepon": phone,
        Role: role,
      })
    );

    const blob = convertObjectArrayToExcelBlob(employees);

    downloadBlobFile(blob, "Data Karyawan Millenium.xlsx");
  };

  return { exportToExcel, isFetching };
}
