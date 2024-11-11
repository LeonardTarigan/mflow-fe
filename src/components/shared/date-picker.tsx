"use client";

import * as React from "react";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/shared/button";
import { Calendar } from "@/components/shared/calendar";
import { id } from "date-fns/locale";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/shared/popover";

export function DatePicker() {
  const [date, setDate] = React.useState<Date>();

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "w-full justify-between pl-3 text-left font-normal",
            !date && "text-muted-foreground",
          )}
        >
          {date ? (
            format(date, "PPP", { locale: id })
          ) : (
            <span>Tanggal Lahir</span>
          )}
          <CalendarIcon size={15} />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar
          mode="single"
          selected={date}
          onSelect={setDate}
          initialFocus
          lang="id"
          locale={id}
        />
      </PopoverContent>
    </Popover>
  );
}
