import React, { useState, useEffect } from 'react';
import axios from 'axios';

export const StockNews = ({ symbol }) => {
  const [stockNews, setStockNews] = useState([]);
  const apiKey = process.env.REACT_APP_API_KEY;
  const apiLink = "https://financialmodelingprep.com/api/v3/stock_news?tickers=" + symbol + "&limit=5&apikey=" + apiKey;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(apiLink);
        setStockNews(response.data);
      } catch (error) {
        console.error('Error fetching stock news:', error);
      }
    };

    fetchData();
  }, [symbol]);

  return (
    <div>
    <h2>Latest News for {symbol}</h2>
    {stockNews.length > 0 ? (
      <ul>
        {stockNews.map((newsItem) => (
          <li key={newsItem.publishedDate}>
            {/* {newsItem.image && <img src={newsItem.image} alt={newsItem.title} />} */}
            <a href={newsItem.url} target="_blank" rel="noopener noreferrer">
              {newsItem.title}
            </a>
          </li>
        ))}
      </ul>
    ) : (
      <p>Loading...</p>
    )}
  </div>
  );
};

