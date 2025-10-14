"use client";

import SearchBar from "@/common/components/search/search-bar";
import useQueryPatients from "../../hooks/useQueryPatients";
import PatientDataTable from "../components/table/patient-data-table";

export default function PatientDataContainer() {
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
      </section>
      <section className="rounded-xl border">
        <PatientDataTable
          data={data}
          isLoading={isLoading}
          onPageChange={setUrlQuery}
        />
      </section>
    </main>
  );
}
