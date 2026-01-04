"use client";

import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/common/components/chart/chart";
import { DateRangePicker } from "@/common/components/datepicker/date-range-picker";
import { IDailyIncome } from "@/common/models/statistic.model";
import { BanknoteIcon } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts";
import { getDailyIncome } from "../../../repository/dashboard.repository";

const chartConfig = {
  income: {
    label: "Total",
    color: "hsl(var(--chart-4))",
  },
} satisfies ChartConfig;

export function IncomeStatsSection() {
  const searchParams = useSearchParams();
  const period = searchParams.get("periode");
  const [startDate, endDate] = period?.split("_") || [];

  const [chartData, setChartData] = useState<IDailyIncome[]>([]);

  const getData = async () => {
    const res = await getDailyIncome({
      startDate,
      endDate,
    });

    if (res.data) setChartData(res.data);
  };

  useEffect(() => {
    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [period]);

  return (
    <section className="w-full space-y-5 rounded-xl bg-white p-5">
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <div className="flex items-center justify-center rounded-full bg-secondary-100 bg-opacity-50 p-2">
            <BanknoteIcon size={20} className="text-secondary-600" />
          </div>
          <h3 className="text-xl font-semibold">Pendapatan Harian</h3>
        </div>
        <DateRangePicker />
      </div>
      <ChartContainer config={chartConfig} className="h-[48dvh] w-full pt-5">
        <AreaChart
          accessibilityLayer
          data={chartData}
          margin={{
            left: 12,
            right: 12,
          }}
        >
          <CartesianGrid vertical={false} />
          <XAxis
            dataKey="date"
            tickLine={false}
            axisLine={false}
            tickMargin={8}
          />
          <YAxis
            dataKey="total"
            tickLine={false}
            axisLine={false}
            tickMargin={8}
          />
          <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
          <defs>
            <linearGradient id="fillIncome" x1="0" y1="0" x2="0" y2="1">
              <stop
                offset="5%"
                stopColor={chartConfig.income.color}
                stopOpacity={0.8}
              />
              <stop
                offset="95%"
                stopColor={chartConfig.income.color}
                stopOpacity={0.1}
              />
            </linearGradient>
          </defs>
          <Area
            dataKey="total"
            type="linear"
            fill="url(#fillIncome)"
            fillOpacity={0.4}
            stroke={chartConfig.income.color}
            stackId="a"
          />
        </AreaChart>
      </ChartContainer>
    </section>
  );
}
