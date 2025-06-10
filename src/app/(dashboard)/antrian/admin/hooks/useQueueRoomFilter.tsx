import { useRouter, useSearchParams } from "next/navigation";

export default function useQueueRoomFilter() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const setRoomId = (roomId: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (roomId !== "0") {
      params.set("roomId", roomId);
    } else {
      params.delete("roomId");
    }
    router.replace(`?${params.toString()}`, { scroll: false });
  };

  const selectedRoomId = searchParams.get("roomId") || "0";

  return { selectedRoomId, setRoomId };
}
