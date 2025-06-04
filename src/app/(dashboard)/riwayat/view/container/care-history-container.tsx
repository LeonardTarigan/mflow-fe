import SearchBar from "@/common/components/search/search-bar";
import useQueryCareHistory from "../../hooks/useQueryCareHistory";
import CareHistoryTable from "../components/table/care-history-table";

export default function CareHistoryContainer() {
  const {
    res,
    urlQuery,
    setUrlQuery,
    handleOnSearchChange,
    handleResetSearch,
  } = useQueryCareHistory();

  const { data, isLoading } = res;

  return (
    <main className="space-y-5">
      <section className="flex justify-between gap-5">
        <SearchBar
          defaultValue={urlQuery?.search}
          onChange={handleOnSearchChange}
          onResetSearch={handleResetSearch}
          placeholder="Cari Data Riwayat Pelayanan"
        />
        <div className="flex items-center gap-1">
          {/* <ExportPatientDataButton /> */}
        </div>
      </section>
      <section className="rounded-xl border">
        <CareHistoryTable
          data={data}
          isLoading={isLoading}
          onPageChange={setUrlQuery}
        />
      </section>
    </main>
  );
}
