import React, { useState } from 'react';
import UserPortfolio from './userPortfolio';

interface StockItem {
  stockCode: string;
  companyName: string;
  country: string;
  stockType: string;
}

interface ChecklistProps {
  handleItemClick: (item: StockItem) => void;
}

const Checklist: React.FC<ChecklistProps> = ({ handleItemClick }) => {
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [userPortfolio, setUserPortfolio] = useState<StockItem[]>([]);

  const existingComponents: StockItem[] = [
    { stockCode: 'AAPL', companyName: 'Apple', country: 'USA', stockType: 'Common Stock' },
    { stockCode: 'MSFT', companyName: 'Microsoft', country: 'USA', stockType: 'Common Stock' },
    { stockCode: 'NFLX', companyName: 'Netflix', country: 'USA', stockType: 'Common Stock' },
    { stockCode: 'META', companyName: 'Meta', country: 'USA', stockType: 'Common Stock' },
  ];

  const handleItemToggle = (item: StockItem) => {
    if (selectedItems.includes(item.stockCode)) {
      setSelectedItems(selectedItems.filter((selectedItem) => selectedItem !== item.stockCode));
      setUserPortfolio(userPortfolio.filter((portfolioItem) => portfolioItem.stockCode !== item.stockCode));
    } else {
      setSelectedItems([...selectedItems, item.stockCode]);
      setUserPortfolio([...userPortfolio, item]);
    }
    handleItemClick(item);
  };

  return (
    <div id="check-list" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <div>
        <h1>Existing Components</h1>
        <table>
          <thead>
            <tr>
              <th>Stock Code</th>
              <th>Company Name</th>
              <th>Stock Type</th>
              <th>Country</th>
            </tr>
          </thead>
          <tbody>
            {existingComponents.map((item) => (
              <tr
                key={item.stockCode}
                onClick={() => handleItemToggle(item)}
                className={selectedItems.includes(item.stockCode) ? 'selected' : ''}
              >
                <td>
                  <input
                    type="checkbox"
                    checked={selectedItems.includes(item.stockCode)}
                    readOnly
                  />
                  {item.stockCode}
                </td>
                <td>{item.companyName}</td>
                <td>{item.stockType}</td>
                <td>{item.country}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Checklist;
