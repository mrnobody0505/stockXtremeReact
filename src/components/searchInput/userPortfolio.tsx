import React from 'react';

interface StockItem {
  stockCode: string;
  companyName: string;
  country: string;
  stockType: string;
}

interface UserPortfolioProps {
  userPortfolio: StockItem[];
}

const UserPortfolio: React.FC<UserPortfolioProps> = ({ userPortfolio }) => (
  <div style={{ display: 'flex', justifyContent: 'center', marginTop: '10px' }}>
    <div>
      <h2>User Portfolio</h2>
      <ul>
        {userPortfolio.map((item) => (
          <li key={item.stockCode}>
            {item.stockCode} - {item.companyName} - {item.stockType} - {item.country}
          </li>
        ))}
      </ul>
    </div>
  </div>
);

export default UserPortfolio;
