import "./searchInput.css";
import { useEffect, useState, useRef } from "react";
import axios from "axios";
import SearchInputList from "./searchInputList";

export type Stock = {
  symbol: string;
  name: string;
  currency: string;
  exchange: string;
  mic_code: string;
  country: string;
  type: string;
  //Insert a button here
}

const SearchInput = () => {
  const [value, setValue] = useState("");
  const [allStocks, setAllStocks] = useState<Stock[]>([]);
  const [filteredStocks, setFilteredStocks] = useState<Stock[]>([]);
  const [isListVisible, setListVisible] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchStockData = async () => {
      try {
        const response = await axios
          .get("https://api.twelvedata.com/stocks?source=docs")
          .then((res) => res.data.data);
        setAllStocks(response);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    
    fetchStockData();
  }, []);

  useEffect(() => {
    const sorted = allStocks.filter((stock: Stock) => {
      return value && stock.symbol.startsWith(value.toUpperCase());
    });
    setFilteredStocks(sorted);
  }, [value, allStocks]);

  const handleInput = (val: string) => {
    setValue(val);
    const sorted = allStocks.filter((stock: Stock) => {
      return stock.symbol.startsWith(val.toUpperCase());
    })
    setFilteredStocks(sorted);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
      setListVisible(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="search-wrapper">
      <div id="search-container" ref={wrapperRef}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="1em"
          viewBox="0 0 512 512"
        >
          <path d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z" />
        </svg>
        <input
          type="text"
          value={value}
          onChange={(event) => {
            handleInput(event.target.value);
            setListVisible(true);
          }}
          placeholder="Search"
        />
      </div>
      <SearchInputList stocks={filteredStocks}></SearchInputList>
      {/* {isListVisible && (
        <SearchInputList stocks={filteredStocks}></SearchInputList>
      )} */}
    </div>
  );
};

export default SearchInput;
