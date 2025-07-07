import { addDays, format } from "date-fns";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import type { DateRange } from "react-day-picker";

export default function useDateRangePicker() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const params = new URLSearchParams(searchParams);

  const paramValue = params.get("periode")?.split("_");

  const defaultFromDate = paramValue
    ? new Date(paramValue[0])
    : addDays(new Date(), -6);
  const defaultToDate = paramValue ? new Date(paramValue[1]) : new Date();

  const [date, setDate] = useState<DateRange | undefined>({
    from: defaultFromDate,
    to: defaultToDate,
  });

  const dateRangeToURLParam = (date: DateRange) => {
    if (date?.from && date?.to) {
      return `${format(date.from, "yyyy-MM-dd")}_${format(date.to, "yyyy-MM-dd")}`;
    }
    return "";
  };

  const updateDateRangeURLParam = (date: DateRange | undefined) => {
    if (!Boolean || !date?.from || !date?.to) return;

    const period = dateRangeToURLParam(date);
    params.set("periode", period);
    router.push(`?${params.toString()}`);
  };

  useEffect(() => {
    if (date) updateDateRangeURLParam(date);
  }, [date]);

  return { date, setDate };
}
