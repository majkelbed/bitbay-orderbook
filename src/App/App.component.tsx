import { ChakraProvider, Box, Center } from "@chakra-ui/react";
import { CurrencyPicker } from "../Currency/CurrencyPicker.component";
import { OrderBook } from "../OrderBook/OrderBook.component";
import { AppContextProvider } from "./useAppContext.hook";

export const App = () => {
  return (
    <AppContextProvider>
      <ChakraProvider>
        <Box p="5">
          <CurrencyPicker />
          <Center>
            <OrderBook />
          </Center>
        </Box>
      </ChakraProvider>
    </AppContextProvider>
  );
};
