import { useOrderBook } from "./useOrderBook.hook";

export const OrderBook = () => {
    useOrderBook();

    return (
        <div>
            order book :_
        </div>
    )
}