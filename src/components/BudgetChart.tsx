import { useMemo } from "react";
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend } from "recharts";

const COLORS = [
  "hsl(210, 70%, 50%)",
  "hsl(340, 65%, 50%)",
  "hsl(270, 55%, 55%)",
  "hsl(142, 60%, 40%)",
  "hsl(38, 80%, 55%)",
  "hsl(190, 60%, 45%)",
  "hsl(0, 65%, 50%)",
  "hsl(30, 70%, 50%)",
];

interface BudgetItem {
  name: string;
  value: number;
}

function extractBudgetData(content: string): BudgetItem[] | null {
  const lines = content.split("\n");
  const items: BudgetItem[] = [];

  for (const line of lines) {
    // Match patterns like "- Rent: $800" or "| Food | $300 |" or "Groceries — 250"
    const match = line.match(/[-•|*]\s*([A-Za-z\s&/]+)[:\-—|]+\s*\$?([\d,]+(?:\.\d{2})?)/);
    if (match) {
      const name = match[1].trim();
      const value = parseFloat(match[2].replace(",", ""));
      if (name && value > 0 && name.length < 30) {
        items.push({ name, value });
      }
    }
  }

  return items.length >= 2 ? items : null;
}

interface BudgetChartProps {
  content: string;
}

const BudgetChart = ({ content }: BudgetChartProps) => {
  const data = useMemo(() => extractBudgetData(content), [content]);

  if (!data) return null;

  const total = data.reduce((s, d) => s + d.value, 0);

  return (
    <div className="mt-4 space-y-4 rounded-xl border border-border bg-muted/30 p-4">
      <h4 className="text-xs font-semibold text-foreground uppercase tracking-wider">Budget Breakdown</h4>

      <div className="grid gap-4 sm:grid-cols-2">
        {/* Pie */}
        <div className="flex flex-col items-center">
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie data={data} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={75} innerRadius={40} paddingAngle={2}>
                {data.map((_, i) => (
                  <Cell key={i} fill={COLORS[i % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip formatter={(v: number) => `$${v.toLocaleString()}`} />
            </PieChart>
          </ResponsiveContainer>
          <p className="text-xs text-muted-foreground">Total: <span className="font-semibold text-foreground">${total.toLocaleString()}</span></p>
        </div>

        {/* Bar */}
        <ResponsiveContainer width="100%" height={200}>
          <BarChart data={data} layout="vertical" margin={{ left: 10, right: 10 }}>
            <XAxis type="number" tick={{ fontSize: 10 }} tickFormatter={(v) => `$${v}`} />
            <YAxis type="category" dataKey="name" width={80} tick={{ fontSize: 10 }} />
            <Tooltip formatter={(v: number) => `$${v.toLocaleString()}`} />
            <Bar dataKey="value" radius={[0, 4, 4, 0]}>
              {data.map((_, i) => (
                <Cell key={i} fill={COLORS[i % COLORS.length]} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Legend */}
      <div className="flex flex-wrap gap-3">
        {data.map((d, i) => (
          <div key={d.name} className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <div className="h-2.5 w-2.5 rounded-sm" style={{ backgroundColor: COLORS[i % COLORS.length] }} />
            <span>{d.name} ({((d.value / total) * 100).toFixed(0)}%)</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BudgetChart;
