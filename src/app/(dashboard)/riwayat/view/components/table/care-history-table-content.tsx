import QueueStatusChip from "@/common/components/chip/queue-status-chip";
import EmptyDataState from "@/common/components/table/empty-data-state";
import { TableCell, TableRow } from "@/common/components/table/table";
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
      {data.length === 0 && <EmptyDataState colSpan={9} />}
      {data.map(
        (
          {
            id,
            doctor,
            patient,
            room,
            status,
            complaints,
            diagnoses,
            vital_sign,
            created_at,
          },
          index,
        ) => (
          <TableRow key={id}>
            <TableCell className="font-medium">
              {(current_page - 1) * 10 + (index + 1)}
            </TableCell>
            <TableCell>
              {format(new Date(created_at), "dd MMM yyyy, HH:MM", {
                locale: localeId,
              })}
            </TableCell>
            <TableCell>{patient.name}</TableCell>
            <TableCell>{doctor.username}</TableCell>
            <TableCell>{room.name}</TableCell>
            <TableCell>{complaints}</TableCell>
            <TableCell>
              {vital_sign && (
                <ul className="list-disc pl-3 [&_span]:font-semibold">
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
                    Tekanan Darah: <span>{vital_sign.blood_pressure} mmHg</span>
                  </li>
                  <li>
                    Detak Jantung: <span>{vital_sign.heart_rate_bpm} BPM</span>
                  </li>
                  <li>
                    Frekuensi Pernapasan:{" "}
                    <span>{vital_sign.respiratory_rate_bpm} BPM</span>
                  </li>
                </ul>
              )}
            </TableCell>
            <TableCell>
              <ul className="list-disc pl-3">
                {diagnoses.map(({ id, name }) => (
                  <li key={id}>{name}</li>
                ))}
              </ul>
            </TableCell>
            <TableCell>
              <QueueStatusChip status={status} />
            </TableCell>
          </TableRow>
        ),
      )}
    </>
  );
}
