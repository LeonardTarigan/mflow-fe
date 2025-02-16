import SearchBar from "@/common/components/search/search-bar";
import useQueryDrugs from "../../hooks/useQueryDrug";
import ExportDrugDataButton from "../components/button/export-drug-data-button";
import AddDrugModal from "../components/modal/add-drug-modal";
import DrugDataTable from "../components/table/drug-data-table";

export default function DrugDataContainer() {
  const {
    res,
    urlQuery,
    setUrlQuery,
    handleOnSearchChange,
    handleResetSearch,
  } = useQueryDrugs();

  const { data, isLoading } = res;

  return (
    <main className="space-y-5">
      <section className="flex justify-between gap-5">
        <SearchBar
          defaultValue={urlQuery?.search}
          onChange={handleOnSearchChange}
          onResetSearch={handleResetSearch}
          placeholder="Cari Data Obat"
        />
        <div className="flex items-center gap-1">
          <ExportDrugDataButton />
          <AddDrugModal />
        </div>
      </section>
      <section className="rounded-xl border">
        <DrugDataTable
          data={data}
          isLoading={isLoading}
          onPageChange={setUrlQuery}
        />
      </section>
    </main>
  );
}
