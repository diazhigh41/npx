"use client";
import { createContext, useContext, useState } from "react";
import { CURRENCIES } from "../data/currencies";

const CurrencyContext = createContext(null);

export function CurrencyProvider({ children }) {
  const [currencyCode, setCurrencyCode] = useState("USD");
  const currency = CURRENCIES.find((c) => c.code === currencyCode) || CURRENCIES[0];

  function formatPrice(usdAmount) {
    if (usdAmount === undefined || usdAmount === null) return "";
    const converted = usdAmount * currency.rate;
    const decimals = currency.decimals ?? 2;
    const formatted = converted.toLocaleString("en-US", {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals,
    });
    return `${currency.symbol}${formatted}`;
  }

  return (
    <CurrencyContext.Provider value={{ currency, setCurrencyCode, formatPrice, currencies: CURRENCIES }}>
      {children}
    </CurrencyContext.Provider>
  );
}

export function useCurrency() {
  const ctx = useContext(CurrencyContext);
  if (!ctx) throw new Error("useCurrency harus dipakai di dalam <CurrencyProvider>");
  return ctx;
}