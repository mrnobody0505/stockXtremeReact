import React, { useState } from 'react';
import Navbar from '../components/navbar/navbar';
import Checklist from '../components/searchInput/checkList';
import UserPortfolio from '../components/searchInput/userPortfolio';
import { Link } from 'react-router-dom';

interface StockItem {
  stockCode: string;
  companyName: string;
  country: string;
  stockType: string;
}

export const Home = () => {
  const [userPortfolio, setUserPortfolio] = useState<StockItem[]>([]);

  const handleItemClick = (item: StockItem): void => {
    const existingItemIndex = userPortfolio.findIndex(
      (portfolioItem) => portfolioItem.stockCode === item.stockCode
    );

    if (existingItemIndex !== -1) {
      const updatedPortfolio = [...userPortfolio];
      updatedPortfolio.splice(existingItemIndex, 1);
      setUserPortfolio(updatedPortfolio);
    } else {
      setUserPortfolio([...userPortfolio, item]);
    }
  };

  return (
    <div>
      <Navbar />
      <button>
        <Link to="/">Logout</Link>
      </button>
      <Checklist handleItemClick={handleItemClick} />
      <UserPortfolio userPortfolio={userPortfolio} />
    </div>
  );
};

export default Home;