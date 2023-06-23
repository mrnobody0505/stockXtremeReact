import { Stock } from "./searchInput";
import "./searchInputList.css";

interface aduma {
  stocks: String[];
}
const SearchInputList = (props: aduma) => {
  //  return <p>{props.stocks}</p>
  return (
    <ul id="search-lists">
      {props.stocks.slice(0,10).map((stock:String,index) => {
        return <li className="search-item" key={index}>
            <span>{stock} </span>
            {/* <span>{stock.name}</span>
            <span>{stock.country}</span> */}
            </li>;
      })}
    </ul>
  );
};

export default SearchInputList;
