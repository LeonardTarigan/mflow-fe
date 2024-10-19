import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "../shared/table";
import EmptyTableState from "../shared/empty-table-state";
import type { IGeneralFilter, IResponse } from "@/model/general-types";
import type { IEmployee } from "@/model/employee-types";
import ModalEditEmployee from "./modal-edit-employee";
import ModalDeleteEmployee from "./modal-delete-employee";
import TablePagination from "../shared/pagination";
import ChipEmployeeRole from "./chip-employee-role";

interface ITableEmployeeData {
  data: IResponse<IEmployee[]> | undefined;
  isLoading: boolean;
  onPageChange: React.Dispatch<React.SetStateAction<IGeneralFilter>>;
}

export default function TableEmployeeData({
  data,
  isLoading,
  onPageChange,
}: ITableEmployeeData) {
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
          <TableHead>NIP</TableHead>
          <TableHead>Nama</TableHead>
          <TableHead>Role</TableHead>
          <TableHead>Email</TableHead>
          <TableHead>Nomor Telepon</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.data.length === 0 && <EmptyTableState colSpan={7} />}
        {data.data.map(({ id, nip, name, email, phone, role }, index) => (
          <TableRow key={id}>
            <TableCell className="font-medium">
              {(current - 1) * 10 + (index + 1)}
            </TableCell>
            <TableCell>{nip}</TableCell>
            <TableCell>{name}</TableCell>
            <TableCell>
              <ChipEmployeeRole role={role} />
            </TableCell>
            <TableCell>{email}</TableCell>
            <TableCell>{phone}</TableCell>
            <TableCell className="space-x-2">
              <ModalEditEmployee defaultValues={{ name, role, email, phone }} />
              <ModalDeleteEmployee id={id} name={name} />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell colSpan={7}>
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
