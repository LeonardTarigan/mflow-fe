import { Button } from "@/common/components/button/button";
import Image from "next/image";
import useExportEmployeeData from "../../../hooks/useExportEmployeeData";

export default function ExportEmployeeDataButton() {
  const { exportToExcel, isFetching } = useExportEmployeeData();

  return (
    <Button
      onClick={exportToExcel}
      isLoading={isFetching}
      variant="outline"
      className="text-green-700"
      spinnerClassName="border-green-700"
    >
      <div className="relative size-4">
        <Image src={"/assets/img/excel-logo.png"} alt="Excel Logo" fill />
      </div>
      <span>Export</span>
    </Button>
  );
}
