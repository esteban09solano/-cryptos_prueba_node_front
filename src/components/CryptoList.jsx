export default function CryptoList({ data }) {
  const coins = Object.values(data);
  return (
    <table>
      <thead>
        <tr><th>Nombre</th><th>Precio</th><th>Cambio 24h</th></tr>
      </thead>
      <tbody>
        {coins.map((coin) => (
          <tr key={coin.id}>
            <td>{coin.name}</td>
            <td>${coin.quote.USD.price.toFixed(2)}</td>
            <td>{coin.quote.USD.percent_change_24h.toFixed(2)}%</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
