// @/common/hooks/useDateRangePicker.ts
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

  const setDate = (newRange: DateRange | undefined) => {
    const params = new URLSearchParams(searchParams.toString());

    if (newRange?.from) {
      const fromStr = format(newRange.from, "yyyy-MM-dd");
      const toStr = newRange.to ? format(newRange.to, "yyyy-MM-dd") : fromStr;

      params.set("periode", `${fromStr}_${toStr}`);
    } else {
      params.delete("periode");
    }

    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  };

  return { date, setDate };
}
