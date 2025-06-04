import EmptyDataState from "@/common/components/table/empty-data-state";
import { TableCell, TableRow } from "@/common/components/table/table";
import { IPatient } from "@/common/models/patient.model";
import { format } from "date-fns";
import { id as localeId } from "date-fns/locale";
import { MarsIcon, VenusIcon } from "lucide-react";

export default function PatientDataTableContent({
  data,
  current_page,
}: {
  data: IPatient[] | undefined;
  current_page: number;
}) {
  if (!data) return;

  return (
    <>
      {data.length === 0 && <EmptyDataState colSpan={10} />}
      {data.map(
        (
          {
            id,
            name,
            nik,
            medical_record_number,
            gender,
            address,
            birth_date,
            occupation,
            phone_number,
            email,
          },
          index,
        ) => (
          <TableRow key={id}>
            <TableCell className="font-medium">
              {(current_page - 1) * 10 + (index + 1)}
            </TableCell>
            <TableCell>{medical_record_number ?? "-"}</TableCell>
            <TableCell>{name}</TableCell>
            <TableCell>{nik}</TableCell>
            <TableCell>
              {format(new Date(birth_date), "dd MMM yyyy", {
                locale: localeId,
              })}
            </TableCell>
            <TableCell>
              {gender === "MALE" && (
                <div className="flex w-fit items-center gap-1 rounded-full bg-cyan-100 py-1 pl-3 pr-4 text-xs font-medium text-cyan-500">
                  <MarsIcon size={18} />
                  <p>Laki-laki</p>
                </div>
              )}
              {gender === "FEMALE" && (
                <div className="flex w-fit items-center gap-1 rounded-full bg-pink-100 py-1 pl-3 pr-4 text-xs font-medium text-pink-500">
                  <VenusIcon size={18} />
                  <p>Perempuan</p>
                </div>
              )}
            </TableCell>
            <TableCell>{address}</TableCell>
            <TableCell>{occupation}</TableCell>
            <TableCell>{phone_number}</TableCell>
            <TableCell>{email ?? "-"}</TableCell>
          </TableRow>
        ),
      )}
    </>
  );
}
