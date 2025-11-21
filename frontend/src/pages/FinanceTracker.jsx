import { useContext, useEffect, useState } from "react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis
} from "recharts";
import { MarketplaceContext } from "../context/MarketplaceContext";

export default function FinanceTracker() {
  const { transactions } = useContext(MarketplaceContext);
  const [totals, setTotals] = useState({ income: 0, expense: 0, profit: 0 });
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    const income = transactions
      .filter(t => t.type === "income")
      .reduce((sum, t) => sum + t.amount, 0);
    const expense = transactions
      .filter(t => t.type === "expense")
      .reduce((sum, t) => sum + t.amount, 0);
    setTotals({ income, expense, profit: income - expense });

    const dates = [...new Set(transactions.map(t => t.date))].sort();
    const data = dates.map(date => {
      const incomeForDate = transactions
        .filter(t => t.type === "income" && t.date === date)
        .reduce((sum, t) => sum + t.amount, 0);
      const expenseForDate = transactions
        .filter(t => t.type === "expense" && t.date === date)
        .reduce((sum, t) => sum + t.amount, 0);
      return { date, income: incomeForDate, expense: expenseForDate };
    });

    setChartData(data);
  }, [transactions]);

  return (
    <div className="min-h-screen bg-gray-50 p-6 md:p-12">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Finance Tracker</h1>

      {/* Totals cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <div className="bg-white shadow-lg rounded-xl p-6 flex flex-col items-center">
          <h2 className="text-gray-500 font-medium">Income</h2>
          <p className="text-2xl font-bold text-green-500">Ksh {totals.income}</p>
        </div>
        <div className="bg-white shadow-lg rounded-xl p-6 flex flex-col items-center">
          <h2 className="text-gray-500 font-medium">Expenses</h2>
          <p className="text-2xl font-bold text-red-500">Ksh {totals.expense}</p>
        </div>
        <div className="bg-white shadow-lg rounded-xl p-6 flex flex-col items-center">
          <h2 className="text-gray-500 font-medium">Profit</h2>
          <p
            className={`text-2xl font-bold ${
              totals.profit >= 0 ? "text-green-500" : "text-red-500"
            }`}
          >
            Ksh {totals.profit}
          </p>
        </div>
      </div>

      {/* Area Chart (Forex-style) */}
      <div className="bg-white shadow-lg rounded-xl p-6 mb-12">
        <h2 className="text-gray-700 font-semibold mb-4 text-center">
          Income & Expenses Trend
        </h2>
        <div className="w-full h-64">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={chartData} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip formatter={(value) => `Ksh ${value}`} />
              <Legend />
              {/* Shaded Income */}
              <Area
                type="monotone"
                dataKey="income"
                stroke="#4ade80"
                fill="#d1fae5"
                strokeWidth={3}
              />
              {/* Shaded Expense */}
              <Area
                type="monotone"
                dataKey="expense"
                stroke="#f87171"
                fill="#fee2e2"
                strokeWidth={3}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Recent Transactions */}
      <div className="bg-white shadow-lg rounded-xl p-6">
        <h2 className="text-gray-700 font-semibold mb-4">Recent Transactions</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full text-left">
            <thead className="border-b">
              <tr>
                <th className="px-4 py-2">Date</th>
                <th className="px-4 py-2">Type</th>
                <th className="px-4 py-2">Description</th>
                <th className="px-4 py-2">Amount (Ksh)</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((tx) => (
                <tr key={tx.id} className="border-b hover:bg-gray-100">
                  <td className="px-4 py-2">{tx.date}</td>
                  <td
                    className={`px-4 py-2 font-medium ${
                      tx.type === "income" ? "text-green-500" : "text-red-500"
                    }`}
                  >
                    {tx.type.charAt(0).toUpperCase() + tx.type.slice(1)}
                  </td>
                  <td className="px-4 py-2">{tx.description}</td>
                  <td className="px-4 py-2">{tx.amount}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
