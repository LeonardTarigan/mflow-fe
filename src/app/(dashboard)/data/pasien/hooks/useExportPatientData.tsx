import convertObjectArrayToExcelBlob from "@/common/helpers/convertObjectArrayToExcel";
import downloadBlobFile from "@/common/helpers/downloadBlobFile";
import { useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { getAllPatients } from "../repository/patient.repository";
import { format } from "date-fns";
import { id } from "date-fns/locale";

export default function useExportPatientData() {
  const { refetch, isFetching } = useQuery({
    queryKey: ["export-patient-data"],
    queryFn: () => getAllPatients(),
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
      ({
        name,
        nik,
        medical_record_number,
        address,
        birth_date,
        gender,
        occupation,
        phone_number,
        email,
      }) => ({
        "No. MR": medical_record_number ?? "-",
        Nama: name,
        NIK: nik,
        "No. Telepon": phone_number,
        "Jenis Kelamin": gender === "MALE" ? "Laki-laki" : "Perempuan",
        Alamat: address,
        "Tanggal Lahir": format(new Date(birth_date), "dd MMM yyyy", {
          locale: id,
        }),
        Pekerjaan: occupation,
        Email: email ?? "-",
      }),
    );

    const blob = convertObjectArrayToExcelBlob(drugs);

    downloadBlobFile(blob, "Data Pasien Millenium.xlsx");
  };

  return { exportToExcel, isFetching };
}
