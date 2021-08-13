import { Table, Tbody, Tr, Td, Flex, Box, Text } from "@chakra-ui/react";
import { useOrderBook } from "./useOrderBook.hook";

export const OrderBook = () => {
  const { buy, sell } = useOrderBook();

  // Missing spread caused by lack of proper order (?) of order book orders, buy records are sorted in descending order in terms of "ra" and as API returns strings I assume it is not suposed to be mutable.

  return (
    <Flex w="100%" justifyContent="space-evenly">
      <Box>
        <Text align="center">Bid</Text>
        <Table size="sm">
          <Tbody>
            {buy.map(({ ra, ca, sa, pa, co }) => (
              <Tr key={ra}>
                <Td isNumeric>{ra}</Td>
                <Td display={{ base: "none", lg: "table-cell" }} isNumeric>
                  {ca}
                </Td>
                <Td display={{ base: "none", lg: "table-cell" }} isNumeric>
                  {sa}
                </Td>
                <Td display={{ base: "none", lg: "table-cell" }} isNumeric>
                  {pa}
                </Td>
                <Td isNumeric>{co}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </Box>
      
      <Box>
        <Text align="center">Sell</Text>
        <Table size="sm">
          <Tbody>
            {sell.map(({ ra, ca, sa, pa, co }) => (
              <Tr key={ra}>
                <Td isNumeric>{ra}</Td>
                <Td display={{ base: "none", lg: "table-cell" }} isNumeric>
                  {ca}
                </Td>
                <Td display={{ base: "none", lg: "table-cell" }} isNumeric>
                  {sa}
                </Td>
                <Td display={{ base: "none", lg: "table-cell" }} isNumeric>
                  {pa}
                </Td>
                <Td isNumeric>{co}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </Box>
    </Flex>
  );
};
