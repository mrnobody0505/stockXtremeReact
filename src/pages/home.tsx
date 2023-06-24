import React from 'react';
import Navbar from '../components/navbar/navbar';
import Checklist from '../components/searchInput/checkList';
import UserPortfolio from '../components/searchInput/userPortfolio';

interface StockItem {
  stockCode: string;
  companyName: string;
  country: string;
  stockType: string;
}

export const Home = () => {
  return (
    <div>
      <Navbar />
      <Checklist
        handleItemClick={(item: StockItem): void => {
          throw new Error('Function not implemented.');
        }}
      />
      <UserPortfolio userPortfolio={[]} />
    </div>
  );
};
