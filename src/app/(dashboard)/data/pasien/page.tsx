"use client";

import TablePatientData from "@/components/data-pasien/table-patient-data";
import { Button } from "@/components/shared/button";
import SearchBar from "@/components/shared/search-bar";
import useQueryPatients from "@/hooks/data-pasien/useQueryPatient";
import Image from "next/image";

export default function PatientDataPage() {
  const {
    res,
    urlQuery,
    setUrlQuery,
    handleOnSearchChange,
    handleResetSearch,
  } = useQueryPatients();

  const { data, isLoading } = res;

  return (
    <main className="space-y-5">
      <section className="flex justify-between gap-5">
        <SearchBar
          defaultValue={urlQuery?.search}
          onChange={handleOnSearchChange}
          onResetSearch={handleResetSearch}
          placeholder="Cari Data Pasien"
        />
        <div className="flex items-center gap-1">
          <Button variant="outline" className="text-green-700">
            <div className="relative size-4">
              <Image src={"/assets/img/excel-logo.png"} alt="Excel Logo" fill />
            </div>
            <span>Export</span>
          </Button>
        </div>
      </section>
      <section className="rounded-xl border">
        <TablePatientData
          data={data}
          isLoading={isLoading}
          onPageChange={setUrlQuery}
        />
      </section>
    </main>
  );
}
