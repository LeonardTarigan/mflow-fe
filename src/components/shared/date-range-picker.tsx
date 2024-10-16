"use client";

import { Button } from "@/components/shared/button";
import { Calendar } from "@/components/shared/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/shared/popover";
import useDateRangePicker from "@/hooks/useDateRangePicker";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
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
            disabled={{ after: new Date() }}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}
