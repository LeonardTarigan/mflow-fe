import { getAllRooms } from "@/app/(dashboard)/data/ruangan/repository/room.repository";
import { useQuery } from "@tanstack/react-query";

export default function useQueryRooms() {
  const res = useQuery({
    // eslint-disable-next-line @tanstack/query/exhaustive-deps
    queryKey: ["room-data"],
    queryFn: () => getAllRooms(),
  });

  return {
    res,
  };
}
