import { createContext, useContext, useState, useEffect } from "react";

const PayoutContext = createContext();

export function PayoutProvider({ children }) {
  const [rates, setRates] = useState({});
  const [authorStats, setAuthorStats] = useState([]);

  // Load rates from localStorage on mount
  useEffect(() => {
    const storedRates = JSON.parse(localStorage.getItem("payoutRates")) || {};
    setRates(storedRates);
  }, []);

  // Save rates to localStorage when they change
  useEffect(() => {
    localStorage.setItem("payoutRates", JSON.stringify(rates));
  }, [rates]);

  return (
    <PayoutContext.Provider value={{ rates, setRates, authorStats, setAuthorStats }}>
      {children}
    </PayoutContext.Provider>
  );
}

export function usePayout() {
  return useContext(PayoutContext);
}