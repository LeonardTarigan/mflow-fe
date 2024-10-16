"use client";
import { Label, Pie, PieChart } from "recharts";
import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/shared/chart";
import { useMemo } from "react";

export const description = "A donut chart with text";

const chartData = [
  { age: "0-4 tahun", amount: 100, fill: "hsl(var(--chart-1))" },
  { age: "5-12 tahun", amount: 50, fill: "hsl(var(--chart-3))" },
  { age: "13-18 tahun", amount: 90, fill: "hsl(var(--chart-5))" },
  { age: "19-29 tahun", amount: 173, fill: "hsl(var(--chart-4))" },
  { age: "30-44 tahun", amount: 110, fill: "hsl(var(--chart-6))" },
  { age: "45-59 tahun", amount: 120, fill: "hsl(var(--chart-7))" },
  { age: "60-74 tahun", amount: 119, fill: "hsl(var(--chart-8))" },
  { age: "75+ tahun", amount: 100, fill: "hsl(var(--chart-9))" },
];

const chartConfig = {
  amount: {
    label: "Jumlah",
  },
} satisfies ChartConfig;

export function ChartPatient() {
  const totalVisitors = useMemo(() => {
    return chartData.reduce((acc, curr) => acc + curr.amount, 0);
  }, []);

  return (
    <ChartContainer
      config={chartConfig}
      className="aspect-square max-h-[250px] w-full"
    >
      <PieChart>
        <ChartTooltip
          cursor={false}
          content={<ChartTooltipContent hideLabel />}
        />
        <Pie
          data={chartData}
          dataKey="amount"
          nameKey="age"
          innerRadius={50}
          strokeWidth={20}
        >
          <Label
            content={({ viewBox }) => {
              if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                return (
                  <text
                    x={viewBox.cx}
                    y={viewBox.cy}
                    textAnchor="middle"
                    dominantBaseline="middle"
                  >
                    <tspan
                      x={viewBox.cx}
                      y={viewBox.cy}
                      className="fill-foreground font-bold text-2xl"
                    >
                      {totalVisitors.toLocaleString()}
                    </tspan>
                    <tspan
                      x={viewBox.cx}
                      y={(viewBox.cy || 0) + 24}
                      className="fill-muted-foreground"
                    >
                      Pasien
                    </tspan>
                  </text>
                );
              }
            }}
          />
        </Pie>
      </PieChart>
    </ChartContainer>
  );
}
