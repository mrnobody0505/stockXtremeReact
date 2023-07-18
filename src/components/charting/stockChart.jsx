import React, { useEffect, useRef, useState } from "react";
import { createChart } from "lightweight-charts";

const StockChart = ({ apiKey, symbol }) => {
  const chartContainerRef = useRef(null);
  const [loading, setLoading] = useState(true);
  const effectRan = useRef(false);
  const apiLink = "https://financialmodelingprep.com/api/v3/historical-price-full/" + symbol + "?apikey=" + apiKey;
  useEffect(() => {
    const fetchStockData = async () => {
      try {
        const response = await fetch(apiLink);
        const data = await response.json();
        const stockData = data.historical.map((item) => ({
          time: Math.floor(new Date(item.date).getTime() / 1000),
          open: item.open,
          high: item.high,
          low: item.low,
          close: item.close,
        }));
        // console.log("Fetched stock data:", stockData);
        stockData.sort((a, b) => a.time - b.time);
        console.log('Fetched stock data:', stockData);
        renderChart(stockData);
      } catch (error) {
        console.error("Error fetching stock data:", error);
      }
    };
    const renderChart = (stockData) => {
      const chart = createChart(document.getElementById("chart-container"), {
        width: 800,
        height: 400,
      });
      const candlestickSeries = chart.addCandlestickSeries();
      candlestickSeries.setData(stockData);
      //   chart.timeScale().fitContent();
    };
    if (effectRan.current === false) {
      fetchStockData();
      return () => {
        console.log("unmounted");
        effectRan.current = true;
      };
    }
  }, [apiKey, symbol]);

  return <div id="chart-container" />;
};

export default StockChart;
