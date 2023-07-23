import React, { useState, useEffect } from 'react';
import axios from 'axios';

const RealTimeStockPrice = ({ symbol }) => {
  const [stockPrice, setStockPrice] = useState(null);
  const apiKey = process.env.REACT_APP_API_KEY;
  const apiLink = "https://financialmodelingprep.com/api/v3/quote-short/" + symbol + "?apikey=" + apiKey;
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(apiLink);
        setStockPrice(response.data[0].price);
      } catch (error) {
        console.error('Error fetching stock data:', error);
      }
    };

    // Fetch data initially and set up interval to fetch periodically (e.g., every 1 seconds).
    fetchData();
    const interval = setInterval(fetchData, 1000);

    // Clean up the interval when the component unmounts to avoid memory leaks.
    return () => clearInterval(interval);
  }, [symbol]);

  return (
    <div>
      {stockPrice !== null ? (
        <p>{stockPrice}$</p>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default RealTimeStockPrice;