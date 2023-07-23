import { useLocation, useNavigate } from "react-router-dom";
import { Stock } from "../components/searchInput/searchInput";
import StockChart from "../components/charting/stockChart";
import React, { useState, useEffect } from "react";
import RealTimeStockPrice from "../components/stock/realTimeStockPrice/realTimeStockPrice";
import { StockNews } from "../components/stock/stockNews/stockNews";
import { StockFinancials } from "../components/stock/stockFinancials/stockFinancials";
import { db } from "../config/firebase";
import { onValue, push, ref, set } from "firebase/database";
import { UserAuth } from "../context/authContext";
import { StockItem } from "../components/searchInput/userPortfolio";
import { number } from "yup";
import { Type } from "typescript";
export const StockDetails = () => {
  const { user } = UserAuth();
  const location = useLocation();
  const stockInfo: Stock = location.state.stock;
  const [addedToPortfolio, setAddedToPortfolio] = useState(false);
  const [volume, setVolume] = useState(0);
  const [activeInput, setActiveInput] = useState(false);
  const navigate = useNavigate();
  const [stockItems, setStockItems] = useState<StockItem[]>([]);
  const [profileData, setProfileData] = useState<Profile>({
    firstName: "",
    lastName: "",
    gender: "",
    balance: 0,
    stockItems: [],
  });
  function isStockExisted() {
    return stockItems.find((item) => {
      return (
        item.name === stock.name &&
        item.symbol === stock.symbol &&
        item.type === stock.type
      );
    });
  }
  //const country = stockInfo.country;
  const symbol = stockInfo.symbol;
  const apiKey = process.env.REACT_APP_API_KEY;

  const handleAddBtn = () => {
    // const userPortfolio = JSON.parse(localStorage.getItem('userPortfolio') || '[]');
    // userPortfolio.push(stockInfo);
    // localStorage.setItem('userPortfolio', JSON.stringify(userPortfolio));
    //  setAddedToPortfolio(true);
    // setActiveInput(true)
  };
  const companyImageURL =
    "financialmodelingprep.com/image-stock/" + symbol + ".png";

  interface Profile {
    firstName: string;
    lastName: string;
    gender: string;
    balance: number;
    stockItems: StockItem[];
  }
  let stock: StockItem = {
    name: stockInfo.name,
    symbol: stockInfo.symbol,
    type: stockInfo.type,
    volume: volume,
  };

  useEffect(() => {
    console.log("profile");
    console.log(profileData);
  }, [profileData]);

  useEffect(() => {
    console.log("stockItems");
    console.log(stockItems);
  }, [stockItems]);
  useEffect(() => {
    if (user) {
      // Fetch user profile data from Firebase Realtime Database
      const userDatabaseRef = ref(db, `users/${user.uid}`);
      onValue(userDatabaseRef, (snapshot) => {
        if (snapshot.exists()) {
          const profile = snapshot.val();
          console.log(profile);
          if (!profile.hasOwnProperty("stockItems")) {
            console.log("lam gi co");
            profile.stockItems = [];
            setStockItems([]);
          }
          setProfileData(profile);
        }
      });
    }
  }, [user]);
  const handleUpdatePortfolio = async () => {
    console.log("a");
    console.log(isStockExisted());
    let newStockItems: StockItem[];
    let foundStock = isStockExisted();
    if (!foundStock) {
      setStockItems([...stockItems, stock]);
    } else {
      setStockItems(stockItems.filter((item) => item !== foundStock));
      foundStock = {
        ...foundStock,
        volume: foundStock.volume + volume,
      };
      setStockItems([...stockItems, foundStock]);
    }
    setProfileData((prev) => {
      return { ...prev, stockItems: stockItems };
    });
    try {
      const userDatabaseRef = ref(db, `users/${user.uid}`);
      await set(userDatabaseRef, profileData);
      console.log("StockItems updated successfully!");
    } catch (error) {
      console.error("Error updating stockItems:", error);
    }
  };

  return (
    <div style={{ width: "100%" }}>
      {/* <img src={companyImageURL}/> */}
      <h1>{stockInfo.name}</h1>
      <RealTimeStockPrice symbol={symbol} />
      {stockInfo.exchangeShortName}
      <StockChart apiKey={apiKey} symbol={symbol} />
      <StockNews symbol={symbol} />
      <StockFinancials symbol={symbol} />
      <p>current stocks: {isStockExisted()?.volume ?? 0}</p>
      {!addedToPortfolio && (
        <div>
          <button
            onClick={() => {
              setActiveInput(true);
              if (activeInput) {
                if (volume > 0 && volume % 1 === 0) {
                  console.log("about to push");
                  handleUpdatePortfolio();
                } else {
                  console.log("nah");
                }
              }
            }}
          >
            Add to User Portfolio
          </button>
          {activeInput && (
            <div>
              <label htmlFor="volume">Volume</label>
              <button
                onClick={() => {
                  setVolume(volume + 1);
                }}
              >
                +
              </button>
              <input
                type="number"
                name=""
                id="volume"
                value={volume.toString()}
                min={0}
                style={{ border: "1px solid black" }}
                onChange={(e) => setVolume(Math.max(+e.target.value, 0))}
              />
              <button
                onClick={() => {
                  setVolume(Math.max(volume - 1, 0));
                }}
              >
                -
              </button>
            </div>
          )}
        </div>
      )}
      <button onClick={() => navigate("/home")}>Go to Home</button>
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
};

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
