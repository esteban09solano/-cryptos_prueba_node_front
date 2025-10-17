import axios from "axios";
const API_URL = "http://localhost:5000/api";

export const getCryptos = async (symbol) => {
  //   console.log("Fetching cryptos for symbols:", symbol);
  const res = await axios.get(`${API_URL}/cryptos`, { params: { symbol } });
  return res.data;
};

export const getCryptosList = async () => {
  const res = await axios.get(`${API_URL}/cryptos/list`);
  return res.data;
};
