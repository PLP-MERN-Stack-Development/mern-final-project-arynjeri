// src/components/DashboardLayout.jsx
import { useState } from "react";
import { Link, Outlet } from "react-router-dom";

export default function DashboardLayout() {
  const [isOpen, setIsOpen] = useState(true); // for collapsible sidebar

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside className={`bg-gray-800 text-white w-64 p-6 ${isOpen ? "" : "hidden"}`}>
        <h2 className="text-2xl font-bold mb-8">CraftPal</h2>
        <nav className="flex flex-col gap-4">
          <Link to="/Landing" className="hover:text-blue-400">Home</Link>
          <Link to="/ProjectTracker" className="hover:text-blue-400">Project Tracker</Link>
          <Link to="/FinanceTracker" className="hover:text-blue-400">Finance Tracker</Link>
          <Link to="/MaterialTracker" className="hover:text-blue-400">Material Tracker</Link>
          <Link to="/Community" className="hover:text-blue-400">Community</Link>
          <Link to="/Marketplace" className="hover:text-blue-400">Marketplace</Link>
          <Link to="/AIAssistant" className="hover:text-blue-400">AI Assistant</Link>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 bg-gray-100">
        <Outlet />
      </main>
    </div>
  );
}
