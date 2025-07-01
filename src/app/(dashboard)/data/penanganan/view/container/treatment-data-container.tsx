"use client";

import SearchBar from "@/common/components/search/search-bar";
import useQueryTreatments from "../../hooks/useQueryTreatment";
import AddTreatmentModal from "../components/modal/add-treatment-modal";
import TreatmentDataTable from "../components/table/treatment-data-table";

export default function TreatmentDataContainer() {
  const {
    res,
    urlQuery,
    setUrlQuery,
    handleOnSearchChange,
    handleResetSearch,
  } = useQueryTreatments();

  const { data, isLoading } = res;

  return (
    <main className="space-y-5">
      <section className="flex justify-between gap-5">
        <SearchBar
          defaultValue={urlQuery?.search}
          onChange={handleOnSearchChange}
          onResetSearch={handleResetSearch}
          placeholder="Cari Data Penanganan"
        />
        <div className="flex items-center gap-1">
          <AddTreatmentModal />
        </div>
      </section>
      <section className="rounded-xl border">
        <TreatmentDataTable
          data={data}
          isLoading={isLoading}
          onPageChange={setUrlQuery}
        />
      </section>
    </main>
  );
}
