import { useEffect, useState } from "react";
import { useAppContext } from "../App/useAppContext.hook";
import { Order, OrderBook } from "./OrderBook.types";

const LIMIT = 50;

export const useOrderBook = () => {
  const { currency } = useAppContext();
  const [orderBook, setOrderBook] = useState<OrderBook>({
    buy: [],
    sell: [],
  });

  useEffect(() => {
    if (process.env.REACT_APP_BITBAY_SOCKET_BASE_URL === undefined) {
      console.warn("Missing WS configuration URL");
      return;
    }

    const socket = new WebSocket(process.env.REACT_APP_BITBAY_SOCKET_BASE_URL);

    socket.addEventListener("open", () => {
      socket.send(
        JSON.stringify({
          action: "subscribe-public",
          module: "trading",
          path: `orderbook-limited/${currency}/${LIMIT}`,
        })
      );

      socket.send(
        JSON.stringify({
          requestId: "78539fe0-e9b0-4e4e-8c86-70b36aa93d4f",
          action: "proxy",
          module: "trading",
          path: `orderbook-limited/${currency}/${LIMIT}`,
        })
      );
    });

    socket.addEventListener("message", (event) => {
      const { data } = event;
      const response = JSON.parse(data);

      if (response.action === "proxy-response") {
        setOrderBook(response.body);
      }

      if (response.action === "push") {
        const { changes } = response.message;
        changes.forEach((change: any) => {
          const type = change.entryType === "Sell" ? "sell" : "buy";

          if (change.action === "remove") {
            setOrderBook((orderBook) => {
              const filteredOrders = orderBook[type].filter(
                ({ ra }) => ra !== change.rate
              );

              return {
                ...orderBook,
                [type]: filteredOrders,
              };
            });
          } else {
            setOrderBook((orderBook) => {
              let isUpdated = false;
              const updatedOrders = orderBook[type].map((sellOrder) => {
                if (sellOrder.ra === change.rate) {
                  isUpdated = true;
                  return change.state;
                }

                return sellOrder;
              });

              if (!isUpdated) {
                updatedOrders.push(change.state);
              }

              return {
                ...orderBook,
                [type]: updatedOrders,
              };
            });
          }
        });
      }
    });

    return () => socket.close();
  }, [currency]);

  return orderBook;
};
