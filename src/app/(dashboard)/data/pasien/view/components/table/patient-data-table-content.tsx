import EmptyDataState from "@/common/components/table/empty-data-state";
import { TableCell, TableRow } from "@/common/components/table/table";
import { IPatient } from "@/common/models/patient.model";
import { GenderFemaleIcon, GenderMaleIcon } from "@phosphor-icons/react";
import { format } from "date-fns";
import { id as localeId } from "date-fns/locale";
import SendMedicalCardButton from "../button/send-medical-card-button";

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
              {format(new Date(birth_date), "dd MMMM yyyy", {
                locale: localeId,
              })}
            </TableCell>
            <TableCell>
              {gender === "MALE" && (
                <div className="flex w-fit items-center gap-1 rounded-full bg-cyan-100 py-1 pl-3 pr-4 text-xs font-medium text-cyan-500">
                  <GenderMaleIcon size={16} weight="bold" />
                  <p>Laki-laki</p>
                </div>
              )}
              {gender === "FEMALE" && (
                <div className="flex w-fit items-center gap-1 rounded-full bg-pink-100 py-1 pl-3 pr-4 text-xs font-medium text-pink-500">
                  <GenderFemaleIcon size={16} weight="bold" />
                  <p>Perempuan</p>
                </div>
              )}
            </TableCell>
            <TableCell>{address}</TableCell>
            <TableCell>{occupation}</TableCell>
            <TableCell>{phone_number}</TableCell>
            <TableCell>
              <SendMedicalCardButton />
            </TableCell>
          </TableRow>
        ),
      )}
    </>
  );
}
