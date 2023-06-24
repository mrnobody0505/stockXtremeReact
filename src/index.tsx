import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import Checklist from '../src/components/searchInput/checkList';
import Portfolio from '../src/components/searchInput/userPortfolio';
import Navbar from './components/navbar/navbar';
import { BrowserRouter } from 'react-router-dom';

interface StockItem {
  stockCode: string;
  companyName: string;
  country: string;
  stockType: string;
}

const App: React.FC = () => {
  const [userPortfolio, setUserPortfolio] = useState<StockItem[]>([]);

  const handleItemClick = (item: StockItem) => {
    const existingComponents: StockItem[] = [
      { stockCode: 'AAPL', companyName: 'Apple', country: 'USA', stockType: 'Common Stock' },
      { stockCode: 'MSFT', companyName: 'Microsoft', country: 'USA', stockType: 'Common Stock' },
      { stockCode: 'NFLX', companyName: 'Netflix', country: 'USA', stockType: 'Common Stock' },
      { stockCode: 'META', companyName: 'Meta', country: 'USA', stockType: 'Common Stock' },
    ];

    const selectedItem = existingComponents.find((component) => component.stockCode === item.stockCode);

    if (selectedItem) {
      const isItemAlreadySelected = userPortfolio.find(
        (portfolioItem) => portfolioItem.stockCode === item.stockCode
      );

      if (isItemAlreadySelected) {
        setUserPortfolio(userPortfolio.filter((portfolioItem) => portfolioItem.stockCode !== item.stockCode));
      } else {
        setUserPortfolio([...userPortfolio, selectedItem]);
      }
    }
  };

  return (
    <div>
      <Navbar />
      <Checklist handleItemClick={handleItemClick} />
      <Portfolio userPortfolio={userPortfolio} />
    </div>
  );
};

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
    <App />
    
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);