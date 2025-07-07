import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/common/components/chart/chart";
import { CalendarClockIcon } from "lucide-react";
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";

export default function VisitStatsSection() {
  const chartData = [
    { day: "02", total_visit: 40 },
    { day: "03", total_visit: 27 },
    { day: "04", total_visit: 63 },
    { day: "05", total_visit: 33 },
    { day: "06", total_visit: 44 },
    { day: "07", total_visit: 47 },
  ];

  const chartConfig = {
    total_visit: {
      label: "Kunjungan",
      color: "hsl(var(--chart-4))",
    },
  } satisfies ChartConfig;

  return (
    <section className="flex basis-[30%] flex-col justify-between gap-1 rounded-xl bg-white p-5">
      <div className="flex items-center gap-2">
        <div className="flex items-center justify-center rounded-full bg-secondary-100 bg-opacity-50 p-2">
          <CalendarClockIcon size={20} className="text-secondary-600" />
        </div>
        <h3 className="text-xl font-semibold">Kunjungan Harian</h3>
      </div>
      <ChartContainer config={chartConfig}>
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
            dataKey="day"
            tickLine={false}
            axisLine={false}
            tickMargin={8}
            tickFormatter={(value) => value.slice(0, 3)}
          />
          <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
          <defs>
            <linearGradient id="fillVisit" x1="0" y1="0" x2="0" y2="1">
              <stop
                offset="5%"
                stopColor={chartConfig.total_visit.color}
                stopOpacity={0.8}
              />
              <stop
                offset="95%"
                stopColor={chartConfig.total_visit.color}
                stopOpacity={0.1}
              />
            </linearGradient>
          </defs>

          <Area
            dataKey="total_visit"
            type="linear"
            fill="url(#fillVisit)"
            fillOpacity={0.4}
            stroke={chartConfig.total_visit.color}
            stackId="a"
          />
        </AreaChart>
      </ChartContainer>
    </section>
  );
}
