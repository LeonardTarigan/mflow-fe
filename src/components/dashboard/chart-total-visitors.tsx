"use client";

import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/shared/chart";
import useWeeklyVisitors from "@/hooks/dashboard/useWeeklyVisitors";
import { format } from "date-fns";
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";
import { DateRangePicker } from "../shared/date-range-picker";

const chartConfig = {
  desktop: {
    label: "Kunjungan",
    color: "hsl(var(--chart-6))",
  },
} satisfies ChartConfig;

export function ChartTotalVisitors() {
  const { chartData, periodQuery, res } = useWeeklyVisitors();
  const { isFetching } = res;

  const showLoader = isFetching;
  const showChart = !isFetching && chartData && chartData.length > 0;
  const showEmpty = !isFetching && chartData && chartData.length === 0;

  return (
    <div className="flex w-full flex-col gap-5">
      <div className="flex items-center justify-between gap-5">
        <p className="font-bold text-lg text-primary-gradient">
          Kunjungan meningkat 32% minggu ini
        </p>
        <DateRangePicker />
      </div>
      {showLoader && <div className="h-72 w-full" />}
      {showEmpty && (
        <div className="flex h-72 flex-col items-center justify-center gap-2">
          <iframe
            title="Not Found"
            src="https://lottie.host/embed/b5db43dc-864b-4e2d-8ad1-042536dbe95b/O1cPFK7CcS.json"
          />
          <p className="font-medium text-neutral-400">
            Tidak ada data ditemukan untuk periode ini
          </p>
        </div>
      )}
      {showChart && (
        <ChartContainer config={chartConfig} className="h-72 w-full">
          <AreaChart
            key={periodQuery}
            accessibilityLayer
            data={chartData}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="Tanggal"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => format(new Date(value), "dd")}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="line" />}
            />
            <Area
              dataKey="Kunjungan"
              type="natural"
              fill="var(--color-desktop)"
              fillOpacity={0.4}
              stroke="var(--color-desktop)"
              stackId="a"
            />
          </AreaChart>
        </ChartContainer>
      )}
    </div>
  );
}
