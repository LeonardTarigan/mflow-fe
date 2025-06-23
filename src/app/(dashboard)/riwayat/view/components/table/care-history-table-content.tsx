import QueueStatusChip from "@/common/components/chip/queue-status-chip";
import EmptyDataState from "@/common/components/table/empty-data-state";
import { TableCell, TableRow } from "@/common/components/table/table";
import formatToRupiah from "@/common/helpers/formatToRupiah";
import { ICareHistory } from "@/common/models/care-history.model";
import { format } from "date-fns";
import { id as localeId } from "date-fns/locale";

export default function CareHistoryTableContent({
  data,
  current_page,
}: {
  data: ICareHistory[] | undefined;
  current_page: number;
}) {
  if (!data) return;

  return (
    <>
      {data.length === 0 && <EmptyDataState colSpan={11} />}
      {data.map(
        (
          {
            id,
            queue_number,
            doctor,
            patient,
            room,
            status,
            complaints,
            diagnoses,
            vital_sign,
            created_at,
            drug_orders,
          },
          index,
        ) => {
          const totalDrugOrdersPrice = drug_orders.reduce(
            (sum, order) => sum + order.quantity * order.price,
            0,
          );

          const totalPrice = totalDrugOrdersPrice;

          return (
            <TableRow key={id}>
              <TableCell className="font-medium">
                {(current_page - 1) * 10 + (index + 1)}
              </TableCell>
              <TableCell>
                {format(new Date(created_at), "dd MMM yyyy, HH:MM", {
                  locale: localeId,
                })}
              </TableCell>
              <TableCell>{queue_number}</TableCell>
              <TableCell>{patient.medical_record_number}</TableCell>
              <TableCell>{patient.name}</TableCell>
              <TableCell>{doctor.username}</TableCell>
              <TableCell>{room.name}</TableCell>
              <TableCell>{complaints}</TableCell>
              <TableCell>
                {vital_sign && (
                  <ul className="[&_span]:font-semibold">
                    <li>
                      Tinggi Badan: <span>{vital_sign.height_cm} cm</span>
                    </li>
                    <li>
                      Berat Badan: <span>{vital_sign.weight_kg} kg</span>
                    </li>
                    <li>
                      Suhu: <span>{vital_sign.body_temperature_c} C</span>
                    </li>
                    <li>
                      Tekanan Darah:{" "}
                      <span>{vital_sign.blood_pressure} mmHg</span>
                    </li>
                    <li>
                      Detak Jantung:{" "}
                      <span>{vital_sign.heart_rate_bpm} BPM</span>
                    </li>
                    <li>
                      Frekuensi Pernapasan:{" "}
                      <span>{vital_sign.respiratory_rate_bpm} BPM</span>
                    </li>
                  </ul>
                )}
              </TableCell>
              <TableCell>
                <ul>
                  {diagnoses.map(({ id, name }) => (
                    <li key={id}>{name}</li>
                  ))}
                </ul>
              </TableCell>
              <TableCell>
                <ul>
                  {drug_orders.map(({ id, name, quantity }) => (
                    <li key={id}>
                      {name} (x{quantity})
                    </li>
                  ))}
                  {drug_orders.length === 0 && (
                    <p className="italic text-neutral-400">
                      Tidak ada resep obat
                    </p>
                  )}
                </ul>
              </TableCell>
              <TableCell>{formatToRupiah(totalPrice)}</TableCell>
              <TableCell>
                <QueueStatusChip status={status} />
              </TableCell>
            </TableRow>
          );
        },
      )}
    </>
  );
}
