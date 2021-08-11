import { useOrderBook } from "../hooks/useOrderBook.hook";

export const OrderBook = () => {
    useOrderBook();

    return (
        <div>
            order book :_
        </div>
    )
}