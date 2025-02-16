import { useQuery } from "@tanstack/react-query";
import { getAllEmployees } from "../repository/employee.repository";
import * as XLSX from "xlsx";
import toast from "react-hot-toast";

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

    const worksheet = XLSX.utils.json_to_sheet(employees);

    const keys = Object.keys(employees[0]) as (keyof (typeof employees)[0])[];
    const columnWidths = keys.map((key) => ({
      wch:
        Math.max(
          ...employees.map((emp) => String(emp[key]).length),
          key.length
        ) + 2,
    }));

    worksheet["!cols"] = columnWidths;

    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Karyawan");

    const excelBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });
    const blob = new Blob([excelBuffer], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });

    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "Data Karyawan Millenium.xlsx";
    document.body.appendChild(a);
    a.click();

    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return { exportToExcel, isFetching };
}
