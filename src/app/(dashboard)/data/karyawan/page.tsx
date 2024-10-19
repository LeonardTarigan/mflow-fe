"use client";

import ModalAddEmployee from "@/components/data-karyawan/modal-add-employee";
import TableEmployeeData from "@/components/data-karyawan/table-employee-data";
import { Button } from "@/components/shared/button";
import SearchBar from "@/components/shared/search-bar";
import useQueryEmployees from "@/hooks/data-karyawan/useQueryEmployees";
import Image from "next/image";

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
          <ModalAddEmployee />
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
