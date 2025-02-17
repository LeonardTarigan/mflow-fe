"use client";

import SearchBar from "@/common/components/search/search-bar";
import useQueryRooms from "../../hooks/useQueryRoom";
import AddRoomModal from "../components/modal/add-room-modal";
import RoomDataTable from "../components/table/room-data-table";

export default function RoomDataContainer() {
  const {
    res,
    urlQuery,
    setUrlQuery,
    handleOnSearchChange,
    handleResetSearch,
  } = useQueryRooms();

  const { data, isLoading } = res;

  return (
    <main className="space-y-5">
      <section className="flex justify-between gap-5">
        <SearchBar
          defaultValue={urlQuery?.search}
          onChange={handleOnSearchChange}
          onResetSearch={handleResetSearch}
          placeholder="Cari Data Ruangan"
        />
        <div className="flex items-center gap-1">
          <AddRoomModal />
        </div>
      </section>
      <section className="rounded-xl border">
        <RoomDataTable
          data={data}
          isLoading={isLoading}
          onPageChange={setUrlQuery}
        />
      </section>
    </main>
  );
}
