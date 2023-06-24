import React from 'react';
import Navbar from '../components/navbar/navbar';
import Checklist from '../components/searchInput/checkList';
import UserPortfolio from '../components/searchInput/userPortfolio';
import { Link } from "react-router-dom";

interface StockItem {
  stockCode: string;
  companyName: string;
  country: string;
  stockType: string;
}

const Home = () => {
  return (
    <div>
      <Navbar />
       <button><Link to="/">Logout</Link></button>
      <Checklist
        handleItemClick={(item: StockItem): void => {
          throw new Error('Function not implemented.');
        }}
      />
      <UserPortfolio userPortfolio={[]} />
    </div>
  );
};

export default Home;