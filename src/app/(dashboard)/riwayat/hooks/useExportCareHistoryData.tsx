import convertObjectArrayToExcelBlob from "@/common/helpers/convertObjectArrayToExcel";
import downloadBlobFile from "@/common/helpers/downloadBlobFile";
import { useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { format } from "date-fns";
import { id } from "date-fns/locale";
import { getAllCareHistory } from "../repository/care-history.repository";

export default function useExportCareHistory() {
  const { refetch, isFetching } = useQuery({
    queryKey: ["export-care-history"],
    queryFn: () => getAllCareHistory(),
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
        queue_number,
        patient,
        doctor,
        diagnoses,
        complaints,
        created_at,
        room,
        status,
        vital_sign,
      }) => ({
        "No. Antrian": queue_number,
        "Nama Pasien": patient.name,
        Dokter: doctor.username,
        Ruangan: room.name,
        Keluhan: complaints,
        Diagnosa: diagnoses.map((d) => d.name).join(", "),
        Status: status,
        "Tinggi Badan (cm)": vital_sign?.height_cm ?? "-",
        "Berat Badan (kg)": vital_sign?.weight_kg ?? "-",
        "Suhu (C)": vital_sign?.body_temperature_c ?? "-",
        "Tekanan Darah": vital_sign?.blood_pressure ?? "-",
        "Detak Jantung (bpm)": vital_sign?.heart_rate_bpm ?? "-",
        "Frekuensi Pernapasan (bpm)": vital_sign?.respiratory_rate_bpm ?? "-",
        "Tanggal Periksa": format(new Date(created_at), "dd MMM yyyy, HH:mm", {
          locale: id,
        }),
      }),
    );

    const blob = convertObjectArrayToExcelBlob(drugs);

    downloadBlobFile(blob, "Riwayat Pelayanan Millenium.xlsx");
  };

  return { exportToExcel, isFetching };
}
