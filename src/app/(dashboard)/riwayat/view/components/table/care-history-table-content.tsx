import EmptyDataState from "@/common/components/table/empty-data-state";
import { TableCell, TableRow } from "@/common/components/table/table";
import formatToRupiah from "@/common/helpers/formatToRupiah";
import { cn } from "@/common/lib/utils";
import { ICareHistory } from "@/common/models/care-history.model";
import { format } from "date-fns";
import { id as localeId } from "date-fns/locale";
import PaymentDetailModal from "../modal/payment-detail-modal";
import TreatmentDetailModal from "../modal/treatment-detail-modal";

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
            complaints,
            diagnoses,
            vital_sign,
            created_at,
            drug_orders,
            treatments,
          },
          index,
        ) => {
          const totalDrugOrdersPrice = drug_orders.reduce(
            (sum, order) => sum + order.quantity * order.price,
            0,
          );

          const totalTreatmentFee = treatments.reduce(
            (sum, order) => sum + order.quantity * order.applied_price,
            0,
          );

          const totalPrice = totalDrugOrdersPrice + totalTreatmentFee;

          const date = format(new Date(created_at), "dd MMM yyyy, HH:MM", {
            locale: localeId,
          });

          return (
            <TableRow key={id}>
              <TableCell className="font-medium">
                {(current_page - 1) * 10 + (index + 1)}
              </TableCell>
              <TableCell>{date}</TableCell>
              <TableCell>{patient.medical_record_number}</TableCell>
              <TableCell>{patient.name}</TableCell>
              <TableCell>{doctor.username}</TableCell>
              <TableCell
                className={cn(
                  "font-bold",
                  totalPrice > 0 && "text-emerald-500",
                )}
              >
                {totalPrice > 0 && "+"} {formatToRupiah(totalPrice)}
              </TableCell>
              <TableCell>
                <div className="flex gap-1">
                  <TreatmentDetailModal
                    date={date}
                    room={room.name}
                    queueNumber={queue_number}
                    complaints={complaints}
                    diagnoses={diagnoses}
                    treatments={treatments}
                    vitalSign={vital_sign}
                    drugOrders={drug_orders}
                  />
                  <PaymentDetailModal
                    date={date}
                    queueNumber={queue_number}
                    totalPrice={totalPrice}
                    treatments={treatments}
                    drugOrders={drug_orders}
                  />
                </div>
              </TableCell>
            </TableRow>
          );
        },
      )}
    </>
  );
}
