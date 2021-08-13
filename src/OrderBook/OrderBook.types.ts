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
  seqNo: number;
}

export interface WebSocketAction {
  action: "push" | "proxy-response";
  topic: string;
  timestamp: string;
  seqNo: number;
}

export interface WebSocketPush<T> extends WebSocketAction {
  action: "push";
  message: T;
}

export interface WebSocketProxyResponse<T> {
  action: "proxy-response";
  body: T;
}

export interface OrderBookAction {
  marketCode: string;
  entryType: "Buy" | "Sell";
  rate: string;
}

export interface OrderBookUpdate extends OrderBookAction {
  action: "update";
  state: Order;
}

export interface OrderBookRemove extends OrderBookAction {
  action: "remove";
  state: Order;
}

export interface OrderBookChanges {
  changes: Array<OrderBookUpdate | OrderBookRemove>;
}
