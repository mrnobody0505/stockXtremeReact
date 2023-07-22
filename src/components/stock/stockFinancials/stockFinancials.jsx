import React, { useState, useEffect } from 'react';
import axios from 'axios';

export const StockFinancials = ({ symbol }) => {
  const [companyOutlook, setCompanyOutlook] = useState({});
  const [profile, setProfile] = useState({});
  const [ratios, setRatios] = useState({});
  const apiKey = process.env.REACT_APP_API_KEY;
  const apiLink = "https://financialmodelingprep.com/api/v4/company-outlook?symbol=" + symbol + "&apikey=" + apiKey;
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(apiLink);
        console.log(response.data)
        //setCompanyOutlook(response.data);
        setProfile(response.data.profile);
        setRatios(response.data.ratios[0]);
      } catch (error) {
        console.error('Error fetching income statement data:', error);
      }
    };

    fetchData();
    console.log(companyOutlook)
  }, [symbol]);

  const headers = ["Date", "Revenue", "Cost of Revenue", "Gross Profit", "Operating Income", "Net Income"];
  const percentage = (profile.changes / profile.price) * 100;
  const mktCap = profile.mktCap;
  const volAvg = profile.volAvg;
  const beta = profile.beta;
  const changes = profile.changes;
  const range = profile.range;
  const industry = profile.industry;
  const roe = ratios.returnOnEquityTTM * 100;
  const roa = ratios.returnOnAssetsTTM * 100;
  const operatingMargin = ratios.operatingProfitMarginTTM * 100;
  const peRatio = ratios.peRatioTTM;
  const pbRatio = ratios.priceBookValueRatioTTM;
  return (
    <div>
      {console.log(companyOutlook)}
      {companyOutlook ? (
          <div>
          <h2>Company Outlook for {symbol}</h2>
          <p>Industry: {industry}</p>
          <p>Market Cap: {mktCap}</p>
          <p>Volume Average: {volAvg}</p>
          <p>Beta: {beta}</p>
          <p>Changes: {changes} ({percentage.toFixed(2)}%)</p>
          <p>Range: {range}</p>
          <p>ROE: {roe.toFixed(2)}%</p>
          <p>ROA: {roa.toFixed(2)}%</p>
          <p>Operating Margin: {operatingMargin.toFixed(2)}%</p>
          <p>P/E: {peRatio.toFixed(2)}</p>
          <p>P/B: {pbRatio.toFixed(2)}</p>
          {/* Add other company outlook metrics here */}
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

