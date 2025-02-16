import * as XLSX from "xlsx";

const convertObjectArrayToExcelBlob = (data: Record<string, unknown>[]) => {
  const worksheet = XLSX.utils.json_to_sheet(data);

  const keys = Object.keys(data[0]) as (keyof (typeof data)[0])[];
  const columnWidths = keys.map((key) => ({
    wch:
      Math.max(...data.map((emp) => String(emp[key]).length), key.length) + 2,
  }));

  worksheet["!cols"] = columnWidths;

  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Obat");

  const excelBuffer = XLSX.write(workbook, {
    bookType: "xlsx",
    type: "array",
  });
  const blob = new Blob([excelBuffer], {
    type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  });

  return blob;
};

export default convertObjectArrayToExcelBlob;
