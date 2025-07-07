"use client";

import { Button } from "@/common/components/button/button";
import { Calendar } from "@/common/components/calendar/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/common/components/popover/popover";
import useDateRangePicker from "@/common/hooks/useDateRangePicker";
import { cn } from "@/common/lib/utils";
import { addDays, format } from "date-fns";
import { id } from "date-fns/locale";
import { Calendar as CalendarIcon } from "lucide-react";

export function DateRangePicker({
  className,
}: React.HTMLAttributes<HTMLDivElement>) {
  const { date, setDate } = useDateRangePicker();

  return (
    <div className={cn("grid gap-2", className)}>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant={"outline"}
            className={cn(
              "w-fit justify-start text-left font-normal",
              !date && "text-muted-foreground",
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {date?.from ? (
              date.to ? (
                <>
                  {format(date.from, "dd MMM yyyy", { locale: id })} -{" "}
                  {format(date.to, "dd MMM yyyy", { locale: id })}
                </>
              ) : (
                format(date.from, "dd MMM yyyy", { locale: id })
              )
            ) : (
              <span>Pilih tanggal</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            initialFocus
            mode="range"
            defaultMonth={date?.from}
            selected={date}
            onSelect={setDate}
            numberOfMonths={2}
            max={7}
            min={2}
            lang="id"
            locale={id}
            disabled={
              date?.from
                ? { after: addDays(date.from, 7) }
                : { after: new Date() }
            }
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}
