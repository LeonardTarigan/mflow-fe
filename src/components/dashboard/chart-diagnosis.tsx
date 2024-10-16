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
  { diagnosis: "Demam", amount: 30, fill: "hsl(var(--chart-4))" },
  { diagnosis: "Diabetes", amount: 61, fill: "hsl(var(--chart-5))" },
  { diagnosis: "Hipertensi", amount: 72, fill: "hsl(var(--chart-6))" },
  { diagnosis: "Asma", amount: 88, fill: "hsl(var(--chart-7))" },
  { diagnosis: "Gagal ginjal", amount: 54, fill: "hsl(var(--chart-8))" },
];

const chartConfig = {
  amount: {
    label: "Jumlah",
  },
} satisfies ChartConfig;

export function ChartDiagnosis() {
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
          nameKey="diagnosis"
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
                      Kasus
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
