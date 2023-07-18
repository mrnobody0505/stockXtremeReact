import React from 'react';

export interface StockItem {
  name: string;
  symbol: string;
  country: string;
  type: string;
}

interface UserPortfolioProps {
  userPortfolio: StockItem[];
  onRemoveStock: (stock: StockItem) => void;
}

const UserPortfolio: React.FC<UserPortfolioProps> = ({ userPortfolio, onRemoveStock }) => (
<div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
  <div>
    <h2 style={{ textAlign: 'center' }}>User Portfolio</h2>
    <ul style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: 0 }}>
      {userPortfolio.map((item, index) => (
        <li key={index} style={{ textAlign: 'center', margin: '10px 0' }}>
          {item.symbol} - {item.name} - {item.country} - {item.type} 
          <button onClick={() => onRemoveStock(item)}>Remove from Portfolio</button>
        </li>
      ))}
    </ul>
  </div>
</div>

);

export default UserPortfolio;
