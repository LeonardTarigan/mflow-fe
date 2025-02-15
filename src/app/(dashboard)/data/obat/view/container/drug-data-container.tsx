import { Button } from "@/common/components/button/button";
import SearchBar from "@/common/components/search/search-bar";
import Image from "next/image";
import useQueryDrugs from "../../hooks/useQueryDrug";
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
          <Button variant="outline" className="text-green-700">
            <div className="relative size-4">
              <Image src={"/assets/img/excel-logo.png"} alt="Excel Logo" fill />
            </div>
            <span>Export</span>
          </Button>
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
