// src/context/MarketplaceContext.jsx
import { createContext, useState } from "react";

export const MarketplaceContext = createContext();

export const MarketplaceProvider = ({ children }) => {
  const [transactions, setTransactions] = useState([
    // Initial mock data
    { id: 1, type: "income", description: "Sold Crochet Hat", amount: 1200, date: "2025-11-02" },
    { id: 2, type: "expense", description: "Yarn Purchase", amount: 400, date: "2025-11-01" },
  ]);

  // Function to add a sale
  const addSale = (sale) => {
    setTransactions((prev) => [...prev, { ...sale, id: prev.length + 1 }]);
  };

  // Function to add an expense
  const addExpense = (expense) => {
    setTransactions((prev) => [...prev, { ...expense, id: prev.length + 1 }]);
  };

  return (
    <MarketplaceContext.Provider value={{ transactions, addSale, addExpense }}>
      {children}
    </MarketplaceContext.Provider>
  );
};
