import { useLocation, useNavigate } from "react-router-dom"
import { Stock } from "../components/searchInput/searchInput"
import StockChart from "../components/charting/stockChart";
import React, { useState } from 'react';

export const StockDetails = () => {
    const location = useLocation();
    const stockInfo = location.state.stock;
    const [addedToPortfolio, setAddedToPortfolio] = useState(false);
    const navigate = useNavigate();
    //const country = stockInfo.country;
    const symbol = stockInfo.symbol;
    const apiKey = "efc815ecdf7973429abcd4c791f93fe7"
    const addToPortfolio = () => {
      const userPortfolio = JSON.parse(localStorage.getItem('userPortfolio') || '[]');
      userPortfolio.push(stockInfo);
      localStorage.setItem('userPortfolio', JSON.stringify(userPortfolio));
      setAddedToPortfolio(true);
  };
    return (
      <div style={{ width: '100%' }}>
        <h1>{symbol}</h1>
        <StockChart apiKey={apiKey} symbol={symbol} />
        {!addedToPortfolio && <button onClick={addToPortfolio}>Add to User Portfolio</button>}
        <button onClick={() => navigate('/home')}>Go to Home</button>
      </div>
    );
    // const currency = stockInfo.currency;
    // const exchange = stockInfo.exchange;
    // const micCode = stockInfo.mic_code;
    // const type = stockInfo.type;
    // const name = stockInfo.name;
    // return (
    //     <div>
    //         <p>{country}</p>
    //         <p>{symbol}</p>
    //         <p>{currency}</p>
    //         <p>{exchange}</p>
    //         <p>{micCode}</p>
    //         <p>{type}</p>
    //         <p>{name}</p>
    //     </div>
    // )
}

// import React, { useState } from 'react';
// import { useLocation, useNavigate } from 'react-router-dom';
// import { Stock } from '../components/searchInput/searchInput';

// export const StockDetails = () => {
//   const location = useLocation();
//   const stockInfo = location.state.stock;
//   const [addedToPortfolio, setAddedToPortfolio] = useState(false);
//   const navigate = useNavigate();

//   const addToPortfolio = () => {
//     const userPortfolio = JSON.parse(localStorage.getItem('userPortfolio') || '[]');
//     userPortfolio.push(stockInfo);
//     localStorage.setItem('userPortfolio', JSON.stringify(userPortfolio));
//     setAddedToPortfolio(true);
//   };

//   const country = stockInfo.country;
//   const symbol = stockInfo.symbol;
//   const currency = stockInfo.currency;
//   const exchange = stockInfo.exchange;
//   const micCode = stockInfo.mic_code;
//   const type = stockInfo.type;
//   const name = stockInfo.name;

//   return (
//     <div>
//       <p>{country}</p>
//       <p>{symbol}</p>
//       <p>{currency}</p>
//       <p>{exchange}</p>
//       <p>{micCode}</p>
//       <p>{type}</p>
//       <p>{name}</p>
//       {!addedToPortfolio && <button onClick={addToPortfolio}>Add to User Portfolio</button>}
//       <button onClick={() => navigate('/home')}>Go to Home</button>
//     </div>
//   );
// }; 

