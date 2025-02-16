import SearchBar from "@/common/components/search/search-bar";
import useQueryEmployees from "../../hooks/useQueryEmployee";
import ExportEmployeeDataButton from "../components/button/export-employee-data-button";
import AddEmployeeModal from "../components/modal/add-employee-modal";
import TableEmployeeData from "../components/table/employee-data-table";

export default function EmployeeDataContainer() {
  const {
    res,
    urlQuery,
    setUrlQuery,
    handleOnSearchChange,
    handleResetSearch,
  } = useQueryEmployees();

  const { data, isLoading } = res;

  return (
    <main className="space-y-5">
      <section className="flex justify-between gap-5">
        <SearchBar
          defaultValue={urlQuery?.search}
          onChange={handleOnSearchChange}
          onResetSearch={handleResetSearch}
          placeholder="Cari Data Karyawan"
        />
        <div className="flex items-center gap-1">
          <ExportEmployeeDataButton />
          <AddEmployeeModal />
        </div>
      </section>
      <section className="rounded-xl border">
        <TableEmployeeData
          data={data}
          isLoading={isLoading}
          onPageChange={setUrlQuery}
        />
      </section>
    </main>
  );
}
