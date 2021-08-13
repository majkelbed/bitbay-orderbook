import { Select } from "@chakra-ui/react";
import { ReactEventHandler } from "react";
import { useAppContext } from "../App/useAppContext.hook";
import { Currency } from "./Currency.types";

const currencies: Currency[] = ["BTC-PLN", "ETH-PLN"];

export const CurrencyPicker = () => {
  const { currency, setCurrency } = useAppContext();

  const handleSelect: ReactEventHandler<HTMLSelectElement> = (event) => {
    setCurrency(event.currentTarget.value);
  };

  return (
    <Select mb={3} value={currency} onChange={handleSelect}>
      {currencies.map((_currency) => (
        <option key={_currency} value={_currency}>{_currency}</option>
      ))}
    </Select>
  );
};
