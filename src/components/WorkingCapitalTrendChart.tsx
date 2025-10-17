import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { WorkingCapitalItem } from "@/api/models";
import { useState, useMemo } from "react";

interface WorkingCapitalTrendChartProps {
  data: WorkingCapitalItem[];
  currency: string;
}

export const WorkingCapitalTrendChart = ({
  data,
  currency,
}: WorkingCapitalTrendChartProps) => {
  const [period, setPeriod] = useState("last6Months");

  const filteredData = useMemo(() => {
    if (!data || data.length === 0) return [];

    switch (period) {
      case "last7Days":
        return data.slice(-1).map((item) => {
          const days = Array.from({ length: 7 }).map((_, i) => ({
            month: `${item.month} ${i + 1}`,
            income: Math.floor(item.income * (0.8 + Math.random() * 0.4)),
            expense: Math.floor(item.expense * (0.8 + Math.random() * 0.4)),
          }));
          return days;
        })[0];

      case "last30Days":
        return data.slice(-1).map((item) => {
          const days = Array.from({ length: 30 }).map((_, i) => ({
            month: `${item.month} ${i + 1}`,
            income: Math.floor(item.income * (0.5 + Math.random() * 1.2)),
            expense: Math.floor(item.expense * (0.5 + Math.random() * 1.2)),
          }));
          return days;
        })[0];

      case "lastYear":
        return [...data, ...data];

      default:
        return data;
    }
  }, [period, data]);

  const handlePeriodChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setPeriod(event.target.value);
  };

  return (
    <Card className="w-full bg-white rounded-xl shadow-none">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-[20px] font-semibold text-gray-800">
          Working Capital
        </CardTitle>

        <div className="flex items-center justify-between space-x-48">
          <div className="flex items-center gap-5 text-sm">
            <div className="flex items-center gap-1.5 text-gray-700">
              <span className="w-3 h-3 rounded-full bg-emerald-500"></span>
              <span>Income</span>
            </div>
            <div className="flex items-center gap-1.5 text-gray-700">
              <span className="w-3 h-3 rounded-full bg-amber-400"></span>
              <span>Expenses</span>
            </div>
          </div>

          <select
            value={period}
            onChange={handlePeriodChange}
            className="text-sm text-gray-700 bg-gray-50 border rounded-lg px-2.5 py-1.5 focus:outline-none focus:ring-2 focus:ring-gray-100 transition"
          >
            <option value="last7Days">Last 7 days</option>
            <option value="last30Days">Last 30 days</option>
            <option value="last6Months">Last 6 months</option>
            <option value="lastYear">Last year</option>
          </select>
        </div>
      </CardHeader>

      <CardContent className="h-[320px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={filteredData}
            margin={{ top: 10, right: 30, left: 10, bottom: 0 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />

            <XAxis
              dataKey="month"
              tick={{ fontSize: 12, fill: "#9ca3af" }}
              tickLine={false}
              axisLine={false}
            />
            <YAxis
              tickFormatter={(v) => `${v.toLocaleString("tr-TR")}`}
              tick={{ fontSize: 12, fill: "#9ca3af" }}
              tickLine={false}
              axisLine={false}
            />

            <Tooltip
              contentStyle={{
                borderRadius: "10px",
                border: "none",
                backgroundColor: "white",
                boxShadow: "0 4px 10px rgba(0,0,0,0.05)",
              }}
              formatter={(value: number) =>
                `${value.toLocaleString("tr-TR")} ${currency}`
              }
              labelStyle={{ color: "#6b7280", fontWeight: 500 }}
              cursor={{ stroke: "#d1d5db", strokeWidth: 1 }}
            />

            <Line
              type="monotone"
              dataKey="income"
              stroke="#22c55e"
              strokeWidth={2.5}
              name="Income"
              dot={false}
              isAnimationActive
              animationDuration={800}
              activeDot={{ r: 6, fill: "#22c55e", strokeWidth: 0 }}
            />

            <Line
              type="monotone"
              dataKey="expense"
              stroke="#eab308"
              strokeWidth={2.5}
              name="Expenses"
              dot={false}
              isAnimationActive
              animationDuration={800}
              activeDot={{ r: 6, fill: "#eab308", strokeWidth: 0 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};
