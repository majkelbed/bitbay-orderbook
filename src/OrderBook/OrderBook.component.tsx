import {
    Table,
    Tbody,
    Tr,
    Td,
    Flex,
    Box,
    Text
} from "@chakra-ui/react"
import { useOrderBook } from "./useOrderBook.hook";

export const OrderBook = () => {
    const { buy, sell } = useOrderBook();

    return (
        <Flex>
            <Box>
                <Text align="center">Ask</Text>
                <Table variant="simple">
                    <Tbody>
                        {buy.map(({ ra, ca, sa, pa, co }) => (
                            <Tr>
                                <Td isNumeric>{ra}</Td>
                                <Td isNumeric>{ca}</Td>
                                <Td isNumeric>{sa}</Td>
                                <Td isNumeric>{pa}</Td>
                                <Td isNumeric>{co}</Td>
                            </Tr>
                        ))}
                    </Tbody>
                </Table>
            </Box>

            <Box>
                <Text align="center">Bid</Text>
                <Table variant="simple">
                    <Tbody>
                        {sell.map(({ ra, ca, sa, pa, co }) => (
                            <Tr>
                                <Td isNumeric>{ra}</Td>
                                <Td isNumeric>{ca}</Td>
                                <Td isNumeric>{sa}</Td>
                                <Td isNumeric>{pa}</Td>
                                <Td isNumeric>{co}</Td>
                            </Tr>
                        ))}
                    </Tbody>
                </Table>
            </Box>
        </Flex>
    )
}