export interface Order {
    ra: string;
    ca: string;
    sa: string;
    pa: string;
    co: string;  
}

export interface OrderBook {
    sell: Order[];
    buy: Order[];
}

export interface OrderBookResponse extends OrderBook {
    status: string;
    timestamp: string;
    seqNo: string;
}
