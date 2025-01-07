import type { IEmployee } from "@/model/employee.model";
import type { IGeneralFilter, IResponse } from "@/model/common.model";
import EmptyDataState from "../shared/empty-data-state";
import TablePagination from "../shared/pagination";
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "../shared/table";
import ChipEmployeeRole from "./chip-employee-role";
import ModalDeleteEmployee from "./modal-delete-employee";
import ModalUpdateEmployee from "./modal-update-employee";

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

  if (!data?.data || !data?.meta) return;

  const { current_page, total_page, total_data, previous_page, next_page } =
    data.meta;

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
        {data.data.length === 0 && <EmptyDataState colSpan={7} />}
        {data.data.map(({ id, nip, name, email, phone, role }, index) => (
          <TableRow key={id}>
            <TableCell className="font-medium">
              {(current_page - 1) * 10 + (index + 1)}
            </TableCell>
            <TableCell>{nip}</TableCell>
            <TableCell>{name}</TableCell>
            <TableCell>
              <ChipEmployeeRole role={role} />
            </TableCell>
            <TableCell>{email}</TableCell>
            <TableCell>{phone}</TableCell>
            <TableCell className="flex items-center space-x-1">
              <ModalUpdateEmployee
                id={id}
                defaultValues={{ name, role, email, phone }}
              />
              <ModalDeleteEmployee id={id} name={name} />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell colSpan={7}>
            <div className="flex items-center justify-between">
              <p className="font-normal text-base">
                Total <span className="font-bold">{total_data}</span> karyawan
              </p>
              <TablePagination
                {...{
                  previous_page,
                  next_page,
                  current_page,
                  total_page,
                  total_data,
                  onPageChange,
                }}
              />
            </div>
          </TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  );
}
