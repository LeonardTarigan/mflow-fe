import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/common/components/chart/chart";
import { ScanHeartIcon } from "lucide-react";
import { Bar, BarChart, XAxis, YAxis } from "recharts";

export default function DiagnosisStatsSection() {
  const chartData = [
    { diagnosis: "AE34 DBD", total_patient: 186 },
    { diagnosis: "February", total_patient: 305 },
    { diagnosis: "March", total_patient: 237 },
    { diagnosis: "April", total_patient: 73 },
    { diagnosis: "May", total_patient: 209 },
    { diagnosis: "June", total_patient: 214 },
    { diagnosis: "March", total_patient: 214 },
  ];

  const chartConfig = {
    total_patient: {
      label: "Diagnosis",
      color: "hsl(var(--chart-5))",
    },
  } satisfies ChartConfig;

  return (
    <section className="flex basis-[60%] flex-col gap-5 rounded-xl bg-white p-5">
      <div className="flex items-center gap-2">
        <div className="flex items-center justify-center rounded-full bg-secondary-100 bg-opacity-50 p-2">
          <ScanHeartIcon size={20} className="text-secondary-600" />
        </div>
        <h3 className="text-xl font-semibold">Diagnosis Terbanyak</h3>
      </div>
      <ChartContainer config={chartConfig}>
        <BarChart
          accessibilityLayer
          data={chartData}
          layout="vertical"
          margin={{
            left: -20,
          }}
        >
          <XAxis type="number" dataKey="total_patient" hide />
          <YAxis
            dataKey="diagnosis"
            type="category"
            tickLine={false}
            tickMargin={10}
            axisLine={false}
            // tickFormatter={(value) => value?.slice(0, 3)}
          />
          <ChartTooltip
            cursor={false}
            content={<ChartTooltipContent hideLabel />}
          />
          <Bar
            dataKey="total_patient"
            fill={chartConfig.total_patient.color}
            radius={5}
          />
        </BarChart>
      </ChartContainer>
    </section>
  );
}
