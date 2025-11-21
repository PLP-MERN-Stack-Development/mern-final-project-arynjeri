import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children }) {
  const token = localStorage.getItem("token"); // You will store token on login

  if (!token) {
    return <Navigate to="/" replace />; // Redirect to login
  }

  return children;
}
