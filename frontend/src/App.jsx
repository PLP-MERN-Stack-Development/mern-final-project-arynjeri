// src/App.jsx
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { CraftProvider } from "./context/CraftContext";
import { MarketplaceProvider } from "./context/MarketplaceContext";
import { useAuth } from "./hooks/useAuth";

import AIAssistant from "./pages/AIAssistant";
import Community from "./pages/Community";
import FinanceTracker from "./pages/FinanceTracker";
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Marketplace from "./pages/Marketplace";
import MaterialTracker from "./pages/MaterialTracker";
import ProjectTracker from "./pages/ProjectTracker";
import Register from "./pages/Register";

import DashboardLayout from "./components/DashboardLayout";
import ProtectedRoute from "./components/ProtectedRoute";

function AuthWrapper({ children }) {
  useAuth(); // hook runs inside Router context
  return children;
}

function App() {
  return (
    <MarketplaceProvider>
      <CraftProvider>
        <Router>
          <AuthWrapper>
            <Routes>
              {/* PUBLIC ROUTES */}
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />

              {/* PROTECTED DASHBOARD ROUTES */}
              <Route
                element={
                  <ProtectedRoute>
                    <DashboardLayout />
                  </ProtectedRoute>
                }
              >
                <Route path="/" element={<Landing />} />
                <Route path="/Landing" element={<Landing />} />
                <Route path="/ProjectTracker" element={<ProjectTracker />} />
                <Route path="/FinanceTracker" element={<FinanceTracker />} />
                <Route path="/MaterialTracker" element={<MaterialTracker />} />
                <Route path="/Community" element={<Community />} />
                <Route path="/Marketplace" element={<Marketplace />} />
                <Route path="/AIAssistant" element={<AIAssistant />} />
              </Route>

              {/* Catch-all redirects to login */}
              <Route path="*" element={<Login />} />
            </Routes>
          </AuthWrapper>
        </Router>
      </CraftProvider>
    </MarketplaceProvider>
  );
}

export default App;
