import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/common/components/chart/chart";
import { ChartPieIcon } from "lucide-react";
import { Pie, PieChart } from "recharts";

export default function PatientAgeStatsSection() {
  const chartData = [
    { age: "0-4 tahun", total: 100, fill: "hsl(var(--chart-1))" },
    { age: "5-12 tahun", total: 50, fill: "hsl(var(--chart-2))" },
    { age: "13-18 tahun", total: 90, fill: "hsl(var(--chart-3))" },
    { age: "19-29 tahun", total: 173, fill: "hsl(var(--chart-4))" },
    { age: "30-44 tahun", total: 110, fill: "hsl(var(--chart-5))" },
    { age: "45-59 tahun", total: 120, fill: "hsl(var(--chart-6))" },
    { age: "60-74 tahun", total: 119, fill: "hsl(var(--chart-7))" },
    { age: "75+ tahun", total: 100, fill: "hsl(var(--chart-8))" },
  ];

  const chartConfig = {
    total: {
      label: "Total",
    },
  } satisfies ChartConfig;

  return (
    <section className="basis-[40%] rounded-xl bg-white p-5">
      <div className="flex items-center gap-2">
        <div className="flex items-center justify-center rounded-full bg-secondary-100 bg-opacity-50 p-2">
          <ChartPieIcon size={20} className="text-secondary-600" />
        </div>
        <h3 className="text-xl font-semibold">Demografi Pasien</h3>
      </div>
      <ChartContainer config={chartConfig} className="mx-auto aspect-square">
        <PieChart>
          <ChartTooltip
            cursor={false}
            content={<ChartTooltipContent hideLabel />}
          />
          <Pie
            data={chartData}
            innerRadius={40}
            dataKey="total"
            nameKey="age"
          />
        </PieChart>
      </ChartContainer>
    </section>
  );
}
