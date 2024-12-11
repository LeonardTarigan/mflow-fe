"use client";

import TableHistory from "@/components/riwayat/table-history";
import { Button } from "@/components/shared/button";
import SearchBar from "@/components/shared/search-bar";
import useQueryHistory from "@/hooks/history/useQueryHistory";
import Image from "next/image";

export default function RiwayatPage() {
  const {
    res,
    urlQuery,
    setUrlQuery,
    handleOnSearchChange,
    handleResetSearch,
  } = useQueryHistory();

  const { data, isLoading } = res;

  return (
    <main className="space-y-5">
      <section className="flex justify-between gap-5">
        <SearchBar
          defaultValue={urlQuery?.search}
          onChange={handleOnSearchChange}
          onResetSearch={handleResetSearch}
          placeholder="Cari Data Pelayanan"
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
        <TableHistory
          data={data}
          isLoading={isLoading}
          onPageChange={setUrlQuery}
        />
      </section>
    </main>
  );
}
