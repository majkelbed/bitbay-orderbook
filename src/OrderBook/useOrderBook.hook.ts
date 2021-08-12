import { useEffect, useState } from 'react';
import axios from 'axios';
import { OrderBook, OrderBookResponse } from './OrderBook.types';

const baseUrl = process.env.REACT_APP_BITBAY_API_BASE_URL;

export function useOrderBook() {
    const [orderBook, setOrderBook] = useState<OrderBook>({
        buy: [],
        sell: []
    });

    useEffect(() => {
        axios.get<OrderBookResponse>(baseUrl + '/trading/orderbook-limited/BTC-PLN/10').then(({ data }) => setOrderBook(data));
    }, []);

    return orderBook;
}