"use client";

import { Button } from "@/common/components/button/button";
import SearchBar from "@/common/components/search/search-bar";
import Image from "next/image";
import AddEmployeeModal from "./components/modal/add-employee-modal";
import TableEmployeeData from "./components/table/employee-data-table";
import useQueryEmployees from "./hooks/useQueryEmployee";

export default function EmployeeDataPage() {
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
          <Button variant="outline" className="text-green-700">
            <div className="relative size-4">
              <Image src={"/assets/img/excel-logo.png"} alt="Excel Logo" fill />
            </div>
            <span>Export</span>
          </Button>
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
