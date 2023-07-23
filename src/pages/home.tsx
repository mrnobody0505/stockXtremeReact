import React, { useEffect, useState } from 'react';
import { Link, Route, Routes } from 'react-router-dom';
import Navbar from '../components/navbar/navbar';
import UserPortfolio, { StockItem } from '../components/searchInput/userPortfolio';
import UserProfile from '../components/navbar/userProfile'; // Import the UserProfile component

export const Home = () => {
  const [userPortfolio, setUserPortfolio] = useState<StockItem[]>([]);

  useEffect(() => {
    const storedUserPortfolio = JSON.parse(localStorage.getItem('userPortfolio') || '[]');
    setUserPortfolio(storedUserPortfolio);
  }, []);

  const removeFromPortfolio = (stock: StockItem) => {
    const updatedPortfolio = userPortfolio.filter(
      item => item.symbol !== stock.symbol || item.name !== stock.name
    );
    setUserPortfolio(updatedPortfolio);
    localStorage.setItem('userPortfolio', JSON.stringify(updatedPortfolio));
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
      <Navbar />
      <div style={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <UserPortfolio />
      </div>
    </div>
  );
};

export default Home;
