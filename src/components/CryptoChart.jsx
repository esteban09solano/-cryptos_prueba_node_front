import React from "react";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

export default function CryptoChart({ data = [], symbol = "" }) {
  if (!data || data.length === 0) {
    return <div className="text-center text-gray-400 mt-4">No hay datos para graficar.</div>;
  }

  const last = data[data.length - 1];

  return (
    <div className="w-full h-80 mt-4 bg-gray-700 rounded-2xl p-4 shadow-md">
      <div className="flex justify-between mb-2 text-sm text-gray-300">
        <strong>{symbol} — Precio</strong>
        <span>
          Últ:{" "}
          <span className="text-indigo-400 font-semibold">
            {last.price.toLocaleString(undefined, {
              minimumFractionDigits: 2,
              maximumFractionDigits: 8,
            })}
          </span>
        </span>
      </div>

      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="4 4" stroke="#444" />
          <XAxis dataKey="time" tick={{ fill: "#ccc" }} minTickGap={25} />
          <YAxis
            tick={{ fill: "#ccc" }}
            domain={["dataMin", "dataMax"]}
            width={60}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: "#1f2937",
              border: "1px solid #4b5563",
              color: "#fff",
            }}
            formatter={(value) =>
              value && Number(value).toLocaleString(undefined, {
                minimumFractionDigits: 2,
                maximumFractionDigits: 8,
              })
            }
          />
          <Line
            type="monotone"
            dataKey="price"
            stroke="#8b5cf6"
            dot={false}
            strokeWidth={2}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
