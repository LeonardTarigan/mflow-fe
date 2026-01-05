import { addDays, format, parseISO, isValid } from "date-fns";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { DateRange } from "react-day-picker";

export default function useDateRangePicker() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const paramValue = searchParams.get("periode")?.split("_");

  const from =
    paramValue?.[0] && isValid(parseISO(paramValue[0]))
      ? parseISO(paramValue[0])
      : addDays(new Date(), -6);

  const to =
    paramValue?.[1] && isValid(parseISO(paramValue[1]))
      ? parseISO(paramValue[1])
      : new Date();

  const date: DateRange = { from, to };

  // 2. Update URL directly (remove the internal useState/useEffect loop)
  const setDate = (newRange: DateRange | undefined) => {
    const params = new URLSearchParams(searchParams.toString());

    if (newRange?.from && newRange?.to) {
      const formattedRange = `${format(newRange.from, "yyyy-MM-dd")}_${format(newRange.to, "yyyy-MM-dd")}`;
      params.set("periode", formattedRange);
    } else {
      params.delete("periode");
    }

    // Use replace to avoid polluting browser history, or push if preferred
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  };

  return { date, setDate };
}
