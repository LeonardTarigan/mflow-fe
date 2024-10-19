"use client";

import ModalAddDrug from "@/components/data-obat/modal-add-drug";
import TableDrugData from "@/components/data-obat/table-drug-data";
import { Button } from "@/components/shared/button";
import SearchBar from "@/components/shared/search-bar";
import useQueryDrugs from "@/hooks/data-obat/useQueryDrugs";
import Image from "next/image";

export default function DataObatPage() {
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
        />
        <div className="flex items-center gap-1">
          <Button variant="outline" className="text-green-700">
            <div className="relative size-4">
              <Image src={"/assets/img/excel-logo.png"} alt="Excel Logo" fill />
            </div>
            <span>Export</span>
          </Button>
          <ModalAddDrug />
        </div>
      </section>
      <section>
        <TableDrugData
          data={data}
          isLoading={isLoading}
          onPageChange={setUrlQuery}
        />
      </section>
    </main>
  );
}
