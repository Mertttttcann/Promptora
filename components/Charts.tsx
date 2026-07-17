"use client";

import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const AXIS = { fontSize: 11, fill: "#5d6875" };

const tooltipStyle = {
  background: "#14181e",
  border: "1px solid #232a33",
  borderRadius: 10,
  fontSize: 12,
  color: "#e8ecf1",
};

export function KanalChart({ data }: { data: { kanal: string; adet: number }[] }) {
  if (!data.length) return <Bos />;
  return (
    <ResponsiveContainer width="100%" height={200}>
      <BarChart data={data} margin={{ top: 8, right: 8, bottom: 0, left: -22 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#1b212a" vertical={false} />
        <XAxis dataKey="kanal" tick={AXIS} axisLine={false} tickLine={false} />
        <YAxis tick={AXIS} axisLine={false} tickLine={false} allowDecimals={false} />
        <Tooltip contentStyle={tooltipStyle} cursor={{ fill: "rgba(124,92,255,0.06)" }} />
        <Bar dataKey="adet" radius={[6, 6, 0, 0]} fill="#7c5cff" maxBarSize={44} />
      </BarChart>
    </ResponsiveContainer>
  );
}

const SICAKLIK_RENK: Record<string, string> = {
  hot: "#ff5f4d",
  warm: "#f5a524",
  cold: "#6b8cae",
};

export function SicaklikChart({ data }: { data: { ad: string; adet: number }[] }) {
  if (!data.length) return <Bos />;
  return (
    <ResponsiveContainer width="100%" height={200}>
      <PieChart>
        <Pie
          data={data}
          dataKey="adet"
          nameKey="ad"
          innerRadius={52}
          outerRadius={78}
          paddingAngle={3}
          stroke="none"
        >
          {data.map((d) => (
            <Cell key={d.ad} fill={SICAKLIK_RENK[d.ad] ?? "#5d6875"} />
          ))}
        </Pie>
        <Tooltip contentStyle={tooltipStyle} />
      </PieChart>
    </ResponsiveContainer>
  );
}

export function TrendChart({ data }: { data: { gun: string; adet: number }[] }) {
  if (!data.length) return <Bos />;
  return (
    <ResponsiveContainer width="100%" height={220}>
      <LineChart data={data} margin={{ top: 8, right: 8, bottom: 0, left: -22 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#1b212a" vertical={false} />
        <XAxis dataKey="gun" tick={AXIS} axisLine={false} tickLine={false} interval="preserveStartEnd" />
        <YAxis tick={AXIS} axisLine={false} tickLine={false} allowDecimals={false} />
        <Tooltip contentStyle={tooltipStyle} />
        <Line
          type="monotone"
          dataKey="adet"
          stroke="#7c5cff"
          strokeWidth={2}
          dot={false}
          activeDot={{ r: 4, fill: "#7c5cff" }}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}

function Bos() {
  return (
    <div
      className="h-[200px] grid place-items-center text-[12.5px]"
      style={{ color: "var(--text-faint)" }}
    >
      Henüz veri yok
    </div>
  );
}
