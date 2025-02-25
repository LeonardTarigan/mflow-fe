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
import TableRowLoadingSkeleton from "@/common/components/table/table-row-loading-skeleton";
import { IEmployee } from "@/common/models/employee.model";
import { IGeneralFilter, IResponse } from "@/common/models/response.model";
import EmployeeDataTableContent from "./employee-data-able-content";

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
  const {
    previous_page = null,
    next_page = null,
    current_page = 0,
    total_page = 0,
    total_data = 0,
  } = data?.meta || {};

  return (
    <Table className="bg-white">
      <TableHeader>
        <TableRow>
          <TableHead>No.</TableHead>
          <TableHead>Nama</TableHead>
          <TableHead>Role</TableHead>
          <TableHead>Email</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {isLoading && <TableRowLoadingSkeleton column={7} />}
        <EmployeeDataTableContent
          current_page={current_page || 0}
          data={data?.data}
        />
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell colSpan={7}>
            <div className="flex items-center justify-between">
              <p className="text-base font-normal">
                Total <span className="font-bold">{total_data || 0}</span>{" "}
                karyawan
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
