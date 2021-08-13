import {
  useState,
  createContext,
  FunctionComponent,
  Dispatch,
  SetStateAction,
  useContext,
} from "react";
import { Currency } from "../Currency/Currency.types";

interface AppContext {
  currency: Currency;
  setCurrency: Dispatch<SetStateAction<Currency>>;
}

const Context = createContext<AppContext | undefined>(undefined);

export const AppContextProvider: FunctionComponent = ({ children }) => {
  // After login this info could be retrived from server/token which currency is default
  const [currency, setCurrency] = useState<Currency>("BTC-PLN");

  return (
    <Context.Provider value={{ currency, setCurrency }}>
      {children}
    </Context.Provider>
  );
};

export const useAppContext = () => {
  const appContext = useContext(Context);

  if (appContext === undefined) {
    throw new Error("useAppContext must be used within a AppContextProvider");
  }

  return appContext;
};
