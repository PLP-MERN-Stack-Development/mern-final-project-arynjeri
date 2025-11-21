import { Navigate, Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { CraftProvider } from "./context/CraftContext";
import { MarketplaceProvider } from "./context/MarketplaceContext";

import AIAssistant from "./pages/AIAssistant";
import Community from "./pages/Community";
import FinanceTracker from "./pages/FinanceTracker";
import Landing from "./pages/Landing";
import Marketplace from "./pages/Marketplace";
import MaterialTracker from "./pages/MaterialTracker";
import ProjectTracker from "./pages/ProjectTracker";

import DashboardLayout from "./components/DashboardLayout";

function App() {
  return (
    <MarketplaceProvider>
      <CraftProvider>
        <Router>
          <Routes>
            {/* LOGIN/REGISTER DISABLED */}
            <Route path="/login" element={<Navigate to="/" replace />} />
            <Route path="/register" element={<Navigate to="/" replace />} />

            {/* Public dashboard layout */}
            <Route element={<DashboardLayout />}>
              <Route path="/" element={<Landing />} />
              <Route path="/Landing" element={<Landing />} />
              <Route path="/ProjectTracker" element={<ProjectTracker />} />
              <Route path="/FinanceTracker" element={<FinanceTracker />} />
              <Route path="/MaterialTracker" element={<MaterialTracker />} />
              <Route path="/Community" element={<Community />} />
              <Route path="/Marketplace" element={<Marketplace />} />
              <Route path="/AIAssistant" element={<AIAssistant />} />
            </Route>

            {/* Catch-all */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Router>
      </CraftProvider>
    </MarketplaceProvider>
  );
}

export default App;
