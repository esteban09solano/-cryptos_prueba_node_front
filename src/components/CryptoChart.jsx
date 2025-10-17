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
  // Si no hay data mostramos un placeholder
  if (!data || data.length === 0) {
    return <div>No hay datos para graficar.</div>;
  }

  // Si quieres mostrar el primer/último valor:
  const last = data[data.length - 1];

  return (
    <div style={{ width: "100%", height: 300, marginTop: 12 }}>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
        <strong>{symbol ? `${symbol} — Precio` : "Precio"}</strong>
        <span>Últ: {last ? last.price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 8 }) : "-"}</span>
      </div>

      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="time" minTickGap={20} />
          <YAxis domain={["dataMin", "dataMax"]} />
          <Tooltip formatter={(value) => value && Number(value).toLocaleString()} />
          <Line type="monotone" dataKey="price" stroke="#8884d8" dot={false} strokeWidth={2} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
