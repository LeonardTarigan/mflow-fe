import EmptyDataState from "@/common/components/table/empty-data-state";
import { TableCell, TableRow } from "@/common/components/table/table";
import { IEmployee } from "@/common/models/employee.model";
import EmployeeRoleChip from "../chip/employee-role-chip";
import DeleteEmployeeModal from "../modal/delete-employee-modal";
import UpdateEmployeeModal from "../modal/update-employee-modal";
import { useCookies } from "next-client-cookies";

export default function EmployeeDataTableContent({
  data,
  current_page,
}: {
  data: IEmployee[] | undefined;
  current_page: number;
}) {
  const cookies = useCookies();
  const user: IEmployee = JSON.parse(cookies.get("user") || "{}");

  if (!data) return;

  return (
    <>
      {data.length === 0 && <EmptyDataState colSpan={7} />}
      {data.map(({ id, nip, name, email, phone, role }, index) => (
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
              disabled={user.id === id}
            />
            <DeleteEmployeeModal
              id={id}
              name={name}
              disabled={user.id === id}
            />
          </TableCell>
        </TableRow>
      ))}
    </>
  );
}
