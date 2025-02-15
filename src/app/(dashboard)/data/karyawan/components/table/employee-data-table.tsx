import EmptyDataState from "@/common/components/table/empty-data-state";
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/common/components/table/table";
import TablePagination from "@/common/components/table/table-pagination";
import { IEmployee } from "@/common/models/employee.model";
import { IGeneralFilter, IResponse } from "@/common/models/response.model";
import EmployeeRoleChip from "../chip/employee-role-chip";
import DeleteEmployeeModal from "../modal/delete-employee-modal";
import UpdateEmployeeModal from "../modal/update-employee-modal";

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
              <EmployeeRoleChip role={role} />
            </TableCell>
            <TableCell>{email}</TableCell>
            <TableCell>{phone}</TableCell>
            <TableCell className="flex items-center space-x-1">
              <UpdateEmployeeModal
                id={id}
                defaultValues={{ name, role, email, phone }}
              />
              <DeleteEmployeeModal id={id} name={name} />
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
