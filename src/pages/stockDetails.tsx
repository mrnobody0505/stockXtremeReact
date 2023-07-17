import { useLocation } from "react-router-dom"
import { Stock } from "../components/searchInput/searchInput"

export const StockDetails = () => {
    const location = useLocation();
    const stockInfo = location.state.stock;
    const country = stockInfo.country;
    const symbol = stockInfo.symbol;
    const currency = stockInfo.currency;
    const exchange = stockInfo.exchange;
    const micCode = stockInfo.mic_code;
    const type = stockInfo.type;
    const name = stockInfo.name;
    return (
        <div>
            <p>{country}</p>
            <p>{symbol}</p>
            <p>{currency}</p>
            <p>{exchange}</p>
            <p>{micCode}</p>
            <p>{type}</p>
            <p>{name}</p>
        </div>
    )
}