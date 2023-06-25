import { Stock } from "./searchInput";
import "./searchInputList.css";
import { CircleFlag } from "react-circle-flags";
import axios from "axios";
import { useEffect, useState } from "react";
import { Countries } from "../../data/countries";
interface aduma {
  stocks: Stock[];
}
const SearchInputList = (props: aduma) => {
  //  return <p>{props.stocks}</p>
  const shortenedContent = (s: string, maxCharacter: number) => {
    if (s.length > maxCharacter) {
      return s.slice(0, maxCharacter) + "...";
    } else {
      return s;
    }
  };

  const countries = Countries();

  const countryArray = Object.entries(countries).map(([code, name]) => ({
    code,
    name,
  }));

  const findCountryCode = (name:string) => {
    return countryArray.filter((country) => {
      return country.name === name ;
    })[0].code.toLowerCase();
  } 
  return (
    <ul id="search-lists">
      {props.stocks.slice(0, 10).map((stock: Stock, index) => {
        return (
          <li className="search-item" key={index}>
            <span>{shortenedContent(stock.symbol, 6)} </span>
            <span>{shortenedContent(stock.name, 15)}</span>
            <span>{stock.type}</span>
            <span>
             <CircleFlag countryCode={findCountryCode(stock.country)} />
            </span>
          </li>
        );
      })}
    </ul>
  );
};

export default SearchInputList;
