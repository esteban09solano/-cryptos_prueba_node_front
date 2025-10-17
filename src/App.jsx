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
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center p-6">
      <header className="text-center mb-8"><h1 className="text-4xl font-extrabold text-indigo-400 mb-2 tracking-wide">CryptoInvestment</h1>
      <p className="text-gray-400 text-sm">Monitorea precios en tiempo real</p>
      </header>

      <div className="bg-gray-800 rounded-2xl shadow-lg p-6 w-full max-w-2xl">
        <label className="block mb-4 text-sm font-medium text-gray-300">
          Selecciona una criptomoneda:
          <select
            value={selectedSymbol}
            onChange={(e) => {
              setCryptoData({});
              setChartData([]);
              setSelectedSymbol(e.target.value);
            }}
            className="mt-2 w-full bg-gray-700 text-white px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
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
          <div className="bg-gray-700 p-4 rounded-xl shadow-inner mb-6">
            <h2 className="text-2xl font-bold mb-2">{cryptoData.name}</h2>
            <p className="text-lg">
              Precio:{" "}
              <span className="font-semibold text-green-400">
                ${cryptoData.quote.USD.price.toFixed(2)}
              </span>
            </p>
            <p className="text-lg">
              Cambio 24h:{" "}
              <span
                className={
                  cryptoData.quote.USD.percent_change_24h >= 0
                    ? "text-green-400"
                    : "text-red-400"
                }
              >
                {cryptoData.quote.USD.percent_change_24h.toFixed(2)}%
              </span>
            </p>
          </div>
        )}

        <CryptoChart data={chartData} symbol={selectedSymbol} />
      </div>

      <footer className="text-gray-500 text-xs mt-8">
        © {new Date().getFullYear()} CryptoInvestment
      </footer>
    </div>
  );
}

export default App;
