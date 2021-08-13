import { Select } from "@chakra-ui/react";
import { ReactEventHandler } from "react";
import { useAppContext } from "../App/useAppContext.hook";
import { Currency } from "./Currency.types";
import currencyMock from './currencies.mock.json';

const prepareCurrencyPairs = (): Currency[] => {
  const cryptoCurrencies = currencyMock.data.filter(({ type }) => type === 'crypto');
  const fiatCurrencies = currencyMock.data.filter(({ type }) => type === 'fiat');
  const currencyPairs = cryptoCurrencies.flatMap(crypto => fiatCurrencies.map(fiat =>`${crypto.name.toUpperCase()}-${fiat.name.toUpperCase()}`));

  return currencyPairs;
}

const currencies: Currency[] = prepareCurrencyPairs();

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
