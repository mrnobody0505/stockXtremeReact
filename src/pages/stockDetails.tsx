import { useLocation, useNavigate } from "react-router-dom";
import { Stock } from "../components/searchInput/searchInput";
import StockChart from "../components/charting/stockChart";
import React, { useState, useEffect } from "react";
import RealTimeStockPrice from "../components/stock/realTimeStockPrice/realTimeStockPrice";
import { StockNews } from "../components/stock/stockNews/stockNews";
import { StockFinancials } from "../components/stock/stockFinancials/stockFinancials";
import { db } from "../config/firebase";
import { onValue, push, ref, set, update } from "firebase/database";
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
    if (user) {
      // Fetch user profile data from Firebase Realtime Database
      const userDatabaseRef = ref(db, `users/${user.uid}`);
      onValue(userDatabaseRef, (snapshot) => {
        if (snapshot.exists()) {
          const profile = snapshot.val();
          if (profile.hasOwnProperty("stockItems")) {
            // Create the 'stockItems' property and set it to an empty array
            setStockItems(profile.stockItems);
          } 
        }
      });
    }
  }, [user]);
  
  useEffect(() => {
    // Only update the database when stockItems changes
    if (user && stockItems.length > 0) {
      const userDatabaseRef = ref(db, `users/${user.uid}`);
      update(userDatabaseRef, { stockItems })
        .then(() => {
          console.log("StockItems updated to the database.");
        })
        .catch((error) => {
          console.error("Error updating stockItems:", error);
        });
    }
  }, [user, stockItems]);
  
 let doesStockExist: StockItem | undefined;

const handleStockItems = () => {
  doesStockExist = stockItems.find((item) => item.symbol === symbol);
  if (doesStockExist == null) {
    console.log("not found");
    const newStockItems = [...stockItems];
    newStockItems.push(stock);
    setStockItems(newStockItems);
  } else {
    console.log("found");
    console.log(doesStockExist);
    const newStock = {
      ...doesStockExist,
      volume: doesStockExist.volume + volume,
    };
    console.log("new");
    console.log(doesStockExist);
    setStockItems((prevStockItems) => {
      // Use prevStockItems here directly for the update function
      const updatedStockItems = prevStockItems.map((item) => {
        if (item.symbol === symbol) {
          console.log("yes");
          console.log(newStock);
          return newStock;
        } else {
          return item;
        }
      });
      return updatedStockItems; 
    })
  }
};




  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      {/* <img src={companyImageURL}/> */}
      <h1
        style={{ fontSize: "28px", fontWeight: "bold", marginBottom: "10px" }}
      >
        {stockInfo.name}
      </h1>
      <RealTimeStockPrice symbol={symbol} />
      <p style={{ fontSize: "16px", color: "#888" }}>
        {stockInfo.exchangeShortName}
      </p>
      <StockChart apiKey={apiKey} symbol={symbol} />
      <StockNews symbol={symbol} />
      <StockFinancials symbol={symbol} />
      <p style={{ fontSize: "16px" }}>Current volume: {
        (doesStockExist != null ? doesStockExist.volume : 0)
      }</p>
      {!addedToPortfolio && (
        <button
          className="add-to-portfolio-btn"
          style={{
            marginTop: "10px",
            padding: "10px 20px",
            fontSize: "16px",
            backgroundColor: "#ff0000",
            color: "#fff",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
          onClick={() => {
            setActiveInput(true);
            if (activeInput) {
              if (volume > 0 && volume % 1 === 0) {
                console.log("about to push");
                handleStockItems();
              } else {
                console.log("nah");
              }
            }
          }}
        >
          Add to User Portfolio
        </button>
      )}
      {activeInput && (
        <div
          style={{ display: "flex", alignItems: "center", marginTop: "10px" }}
        >
          <label
            htmlFor="volume"
            style={{ fontSize: "16px", marginRight: "10px" }}
          >
            Volume
          </label>
          <button
            style={{
              padding: "5px 10px",
              fontSize: "16px",
              backgroundColor: "#f0f0f0",
              border: "none",
              cursor: "pointer",
            }}
            onClick={() => setVolume(volume + 1)}
          >
            +
          </button>
          <input
            type="number"
            name=""
            id="volume"
            value={volume.toString()}
            min={0}
            style={{
              width: "80px",
              fontSize: "16px",
              textAlign: "center",
              border: "1px solid #ddd",
              borderRadius: "5px",
              padding: "5px",
            }}
            onChange={(e) => setVolume(Math.max(+e.target.value, 0))}
          />
          <button
            style={{
              padding: "5px 10px",
              fontSize: "16px",
              backgroundColor: "#f0f0f0",
              border: "none",
              cursor: "pointer",
            }}
            onClick={() => setVolume(Math.max(volume - 1, 0))}
          >
            -
          </button>
        </div>
      )}
      <button
        className="go-to-home-btn"
        style={{
          marginTop: "10px",
          padding: "10px 20px",
          fontSize: "16px",
          backgroundColor: "#0000ff",
          color: "#fff",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
        }}
        onClick={() => navigate("/home")}
      >
        Go to Home
      </button>
    </div>
  );
};
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
