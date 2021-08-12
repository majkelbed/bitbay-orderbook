import { ChakraProvider } from "@chakra-ui/react"
import { OrderBook } from "../OrderBook/OrderBook.component";

export const App = () => {
    return (
        <ChakraProvider>
            <OrderBook />
        </ChakraProvider>
    );
}