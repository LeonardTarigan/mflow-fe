import type { IGeneralFilter, IResponse } from "@/model/general-types";
import type { Dispatch, SetStateAction } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "../shared/table";
import TablePagination from "../shared/pagination";
import type { IPatient } from "@/model/patient-types";
import ModalDeletePatient from "./modal-delete-patient";
import ModalEditPatient from "./modal-edit-patient";
import ModalDiseaseHistory from "./modal-disease-history";
import EmptyDataState from "../shared/empty-data-state";

interface ITablePatientData {
  data: IResponse<IPatient[]> | undefined;
  isLoading: boolean;
  onPageChange: Dispatch<SetStateAction<IGeneralFilter>>;
}

export default function TablePatientData({
  data,
  isLoading,
  onPageChange,
}: ITablePatientData) {
  if (isLoading)
    return (
      <div className="aspect-video w-full animate-pulse rounded-xl bg-neutral-200" />
    );

  if (!data?.data || !data?.pagination) return;

  const { current, total, prev, next } = data.pagination;

  return (
    <Table className="bg-white">
      <TableHeader>
        <TableRow>
          <TableHead>No.</TableHead>
          <TableHead>Nama</TableHead>
          <TableHead className="whitespace-nowrap">Tanggal Lahir</TableHead>
          <TableHead className="min-w-[200px]">Alamat</TableHead>
          <TableHead>Pekerjaan</TableHead>
          <TableHead className="whitespace-nowrap">Nomor Telepon</TableHead>
          <TableHead>Email</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.data.length === 0 && <EmptyDataState colSpan={7} />}
        {data.data.map(
          (
            { id, name, birth_date, address, occupation, email, phone_number },
            index,
          ) => (
            <TableRow key={id}>
              <TableCell className="font-medium">
                {(current - 1) * 10 + (index + 1)}
              </TableCell>
              <TableCell>{name}</TableCell>
              <TableCell>{birth_date}</TableCell>
              <TableCell>{address}</TableCell>
              <TableCell>{occupation}</TableCell>
              <TableCell>{phone_number}</TableCell>
              <TableCell>{email}</TableCell>
              <TableCell className="flex items-center space-x-1">
                <ModalDiseaseHistory id={id} />
                <ModalEditPatient
                  defaultValues={{
                    name,
                    address,
                    birth_date,
                    occupation,
                    email,
                    phone_number,
                  }}
                />
                <ModalDeletePatient id={id} name={name} />
              </TableCell>
            </TableRow>
          ),
        )}
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell colSpan={8}>
            <div className="flex items-center justify-end">
              <TablePagination
                {...{ prev, next, current, total, onPageChange }}
              />
            </div>
          </TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  );
}
