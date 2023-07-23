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
  const percentage = Math.round((profile.changes / profile.price) * 100 * 100) / 100;
  const mktCap = profile.mktCap;
  const volAvg = profile.volAvg;
  const beta = Math.round(profile.beta * 100) / 100;
  const changes = profile.changes;
  const range = profile.range;
  const industry = profile.industry;
  const roe = Math.round(ratios.returnOnEquityTTM * 100 * 100) / 100;
  const roa = Math.round(ratios.returnOnAssetsTTM * 100 * 100) / 100;
  const operatingMargin = Math.round(ratios.operatingProfitMarginTTM * 100 * 100) / 100;
  const peRatio = Math.round(ratios.peRatioTTM * 100) / 100;
  const pbRatio = Math.round(ratios.priceBookValueRatioTTM * 100) / 100;
  return (
    <div>
      {console.log(companyOutlook)}
      {companyOutlook ? (
          <div>
          <h2>Company Outlook for {symbol}</h2>
          <p>Industry: {industry}</p>
          <p>Market Cap: {mktCap}$</p>
          <p>Volume Average: {volAvg}$</p>
          <p>Beta: {beta}</p>
          <p>Changes: {changes} ({percentage}%)</p>
          <p>Range: {range}</p>
          <p>ROE: {roe}%</p>
          <p>ROA: {roa}%</p>
          <p>Operating Margin: {operatingMargin}%</p>
          <p>P/E: {peRatio}</p>
          <p>P/B: {pbRatio}</p>
          {/* Add other company outlook metrics here */}
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

