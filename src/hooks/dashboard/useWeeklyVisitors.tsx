import { DashboardAPI } from "@/repository/dashboard-service";
import { useQuery } from "@tanstack/react-query";
import { addDays, format } from "date-fns";
import { useSearchParams } from "next/navigation";

export default function useWeeklyVisitors() {
  const searchParams = useSearchParams();
  const periodQuery = searchParams.get("periode");

  const [from, to] = periodQuery?.split("_") ?? [
    format(addDays(new Date(), -6), "yyyy-mm-dd"),
    format(new Date(), "yyyy-mm-dd"),
  ];

  const getWeeklyVisitors = () => {
    const res = DashboardAPI.getWeeklyVisitors();

    return res.data;
  };

  const res = useQuery({
    queryKey: ["weekly-visitors", { periodQuery }],
    queryFn: getWeeklyVisitors,
    placeholderData: (previousData) => previousData,
  });

  const chartData = res.data
    ?.filter(({ date }) => date >= from && date <= to)
    ?.map(({ date, visitors }) => ({ Tanggal: date, Kunjungan: visitors }));

  return { chartData, periodQuery, res };
}
