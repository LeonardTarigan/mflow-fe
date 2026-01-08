import convertObjectArrayToExcelBlob from "@/common/helpers/convertObjectArrayToExcel";
import downloadBlobFile from "@/common/helpers/downloadBlobFile";
import { useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { format } from "date-fns";
import { id } from "date-fns/locale";
import { getAllCareHistory } from "../repository/care-history.repository";
import { useSearchParams } from "next/navigation";

export default function useExportCareHistory() {
  const searchParams = useSearchParams();
  const search = searchParams.get("search") || "";
  const dateRange = searchParams.get("periode") || undefined;

  const { refetch, isFetching } = useQuery({
    queryKey: ["export-care-history", search, dateRange],
    queryFn: () => getAllCareHistory(undefined, 1, search, dateRange),
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
        vital_sign,
        drug_orders,
        treatments,
      }) => {
        const totalDrugOrders = drug_orders.reduce(
          (sum, order) => sum + order.applied_price * order.quantity,
          0,
        );

        const totalTreatments = treatments.reduce(
          (sum, treatment) =>
            sum + treatment.applied_price * treatment.quantity,
          0,
        );

        const totalPayment = totalDrugOrders + totalTreatments;

        return {
          "Tanggal Periksa": format(
            new Date(created_at),
            "dd MMM yyyy, HH:mm",
            {
              locale: id,
            },
          ),
          "No. Antrian": queue_number,
          "No. Rekam Medis": patient.medical_record_number,
          "Nama Pasien": patient.name,
          Dokter: doctor.username,
          Ruangan: room.name,
          Keluhan: complaints,
          Penanganan: treatments.map((t) => t.treatment.name).join(", "),
          Diagnosis: diagnoses.map((d) => d.name).join(", "),
          "Resep Obat": drug_orders
            .map((d) => `${d.drug.name} ${d.quantity} ${d.drug.unit}`)
            .join(", "),
          "Total Pembayaran": totalPayment,
          "Tinggi Badan (cm)": vital_sign?.height_cm ?? "-",
          "Berat Badan (kg)": vital_sign?.weight_kg ?? "-",
          "Suhu (C)": vital_sign?.body_temperature_c ?? "-",
          "Tekanan Darah": vital_sign?.blood_pressure ?? "-",
          "Detak Jantung (bpm)": vital_sign?.heart_rate_bpm ?? "-",
          "Frekuensi Pernapasan (bpm)": vital_sign?.respiratory_rate_bpm ?? "-",
        };
      },
    );

    const blob = convertObjectArrayToExcelBlob(drugs);

    downloadBlobFile(blob, "Riwayat Pelayanan Millenium.xlsx");
  };

  return { exportToExcel, isFetching };
}
