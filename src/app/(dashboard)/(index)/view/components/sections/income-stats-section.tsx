"use client";

import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/common/components/chart/chart";
import { DateRangePicker } from "@/common/components/datepicker/date-range-picker";
import { BanknoteIcon, TrendingUpIcon } from "lucide-react";
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";

const chartData = [
  { month: "1", income: 550000 },
  { month: "2", income: 550000 },
  { month: "3", income: 700000 },
  { month: "4", income: 467000 },
  { month: "5", income: 893500 },
  { month: "6", income: 729000 },
  { month: "7", income: 900000 },
];

const chartConfig = {
  income: {
    label: "Total",
    color: "hsl(var(--chart-4))",
  },
} satisfies ChartConfig;

export function IncomeStatsSection() {
  return (
    <section className="basis-[70%] space-y-5 rounded-xl bg-white p-5">
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <div className="flex items-center justify-center rounded-full bg-secondary-100 bg-opacity-50 p-2">
            <BanknoteIcon size={20} className="text-secondary-600" />
          </div>
          <h3 className="text-xl font-semibold">Pendapatan Harian</h3>
        </div>
        <DateRangePicker />
      </div>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <p className="text-4xl font-bold">Rp34.000.000</p>
          <div className="flex items-center gap-1 rounded-full bg-success-100 px-4 py-1 text-sm font-semibold text-success-600">
            <TrendingUpIcon size={18} />
            <p>30%</p>
          </div>
        </div>
      </div>
      <ChartContainer
        config={chartConfig}
        className="aspect-video w-full pt-5 md:aspect-auto md:h-72"
      >
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
            dataKey="month"
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
            dataKey="income"
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
