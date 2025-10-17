import { useEffect, useState } from "react";
import { getCryptos ,getCryptosList} from "./services/api";
import CryptoChart from "./components/CryptoChart";

function App() {
   
  const [cryptoList, setCryptoList] = useState([]);
  const [selectedSymbol, setSelectedSymbol] = useState("BTC");
  const [cryptoData, setCryptoData] = useState({});
  const [chartData, setChartData] = useState([]);

  // Cargar datos cada vez que cambia el símbolo
  useEffect(() => {
    const load = async () => {
      try {
        // console.log("Cargando datos para:", selectedSymbol);
        const result = await getCryptos([selectedSymbol]);
        // console.log("Datos de la API:", result);
        const coin = result[selectedSymbol];
        if (!coin) return;

        // Datos para el gráfico
        const now = new Date();
        const point = {
          time: now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
          price: coin.quote.USD.price,
        };
        setCryptoData(coin);
        setChartData((prev) => [...prev.slice(-59), point]); // mantiene últimos 60 puntos
      } catch (err) {
        console.error("Error cargando datos", err);
      }
    };

    load();

    // Actualiza cada 60 segundos
    const interval = setInterval(load, 60000);
    return () => clearInterval(interval);
  }, [selectedSymbol]);

  useEffect(() => {
    const loadList = async () => {
      const list = await getCryptosList();
      setCryptoList(list);
    };
    loadList();
  }, []);

  return (
    <div style={{ padding: 20 }}>
      <h1>CryptoInvestment</h1>

      <label>
        Selecciona una criptomoneda:{" "}
        <select
          value={selectedSymbol}
          onChange={(e) => {
            // console.log(e.target.value);
            setCryptoData({});
            setChartData([]);
            setSelectedSymbol(e.target.value);
          }}
        >
          {cryptoList.length > 0 ? (
            cryptoList.map((coin) => (
              <option key={coin.symbol} value={coin.symbol}>
                {coin.name} ({coin.symbol})
              </option>
            ))
          ) : (
            <option>Cargando...</option>
          )}
        </select>
      </label>

      {cryptoData.quote && (
        <div>
          <h2>{cryptoData.name}</h2>
          <p>
            Precio: ${cryptoData.quote.USD.price.toFixed(2)} <br />
            Cambio 24h: {cryptoData.quote.USD.percent_change_24h.toFixed(2)}%
          </p>
        </div>
      )}

      <CryptoChart data={chartData} symbol={selectedSymbol} />
    </div>
  );
}

export default App;
