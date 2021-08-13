import { useEffect, useState } from "react";
import { useAppContext } from "../App/useAppContext.hook";
import {
  Order,
  OrderBook,
  OrderBookChanges,
  WebSocketAction,
  WebSocketProxyResponse,
  WebSocketPush,
} from "./OrderBook.types";

const LIMIT = 10;
// global variables could be moved to common conts file
const ACTIONS = {
  SUBSCRIBE_PUBLIC: 'subscribe-public',
  PROXY: 'proxy'
}
const MODULES = {
  TRADING: 'trading'
}
const PATHS = {
  ORDERBOOK_LIMITED: 'orderbook-limited'
}
const REQUEST_ID = "78539fe0-e9b0-4e4e-8c86-70b36aa93d4f";

export const useOrderBook = () => {
  const { currency } = useAppContext();
  const [orderBook, setOrderBook] = useState<OrderBook>({
    buy: [],
    sell: [],
    seqNo: 0
  });

  const _webSocketProxyResponseHandler = (
    response: WebSocketProxyResponse<OrderBook>
  ) => {
    setOrderBook(response.body);
  };

  const _webSocketPushHandler = (response: WebSocketPush<OrderBookChanges>) => {
    const { changes } = response.message;
    // missing seqNo check for data consistency

    changes.forEach((change) => {
      const orderType: keyof OrderBook = change.entryType === "Sell" ? "sell" : "buy";

      if (change.action === "remove") {
        setOrderBook((orderBook) => {
          const filteredOrders = orderBook[orderType].filter(
            ({ ra }) => ra !== change.rate
          );

          return {
            ...orderBook,
            [orderType]: filteredOrders,
          };
        });
      }

      if (change.action === "update") {
        setOrderBook((orderBook) => {
          // for of seems easier to read here
          // 
          // const updatedOrders = orderBook[orderType].reduce(
          //   ({ acc, isNew }, order, index, collection) => {
          //     if (order.ra === change.rate) {
          //       return {
          //         acc: [...acc, change.state],
          //         isNew: false,
          //       };
          //     }

          //     if (isNew && collection.length - 1 === index) {
          //       return {
          //         acc: [...acc, change.state],
          //         isNew,
          //       };
          //     }

          //     return {
          //       acc: [...acc, order],
          //       isNew,
          //     };
          //   },
          //   { acc: [], isNew: true } as {
          //     acc: Order[];
          //     isNew: boolean;
          //   }
          // );

          let updatedOrders: Order[] = [];
          let isNew = true;

          for (const order of orderBook[orderType]) {
            if (order.ra === change.rate) {
              isNew = false;
              updatedOrders.push(change.state);
              continue;
            }

            updatedOrders.push(order);
          }

          if(isNew) {
            // Maybe snapshot should be taken when missing record is found, cause of losing proper orders order ?
            updatedOrders.push(change.state);
          }

          return {
            ...orderBook,
            [orderType]: updatedOrders,
          };
        });
      }
    });
  };

  useEffect(() => {
    if (process.env.REACT_APP_BITBAY_SOCKET_BASE_URL === undefined) {
      console.warn("Missing WS configuration URL");
      return;
    }

    const socket = new WebSocket(process.env.REACT_APP_BITBAY_SOCKET_BASE_URL);

    socket.addEventListener("open", () => {
      socket.send(
        JSON.stringify({
          action: ACTIONS.SUBSCRIBE_PUBLIC,
          module: MODULES.TRADING,
          // could be a function with URL params as arguments
          path: `${PATHS.ORDERBOOK_LIMITED}/${currency}/${LIMIT}`,
        })
      );

      socket.send(
        JSON.stringify({
          requestId: REQUEST_ID,
          action: ACTIONS.PROXY,
          module: MODULES.TRADING,
          // could be a function with URL params as arguments
          path: `${PATHS.ORDERBOOK_LIMITED}/${currency}/${LIMIT}`,
        })
      );
    });

    socket.addEventListener("message", (event) => {
      const { data } = event;
      const response: WebSocketAction = JSON.parse(data);

      switch (response.action) {
        case "proxy-response":
          _webSocketProxyResponseHandler(response as any);
          break;
        case "push":
          _webSocketPushHandler(response as any);
          break;
      }
    });

    return () => socket.close();
  }, [currency]);

  return orderBook;
};
