import { jwtDecode } from "jwt-decode"; // fixed import
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { setAuthToken } from "../api/axios";

const AUTO_LOGOUT_MINUTES = 15;

export const useAuth = () => {
const navigate = useNavigate();

useEffect(() => {
const token = localStorage.getItem("token");
if (!token) {
navigate("/login");
return;
}

try {
  const decoded = jwtDecode(token); // decode JWT
  const now = Date.now() / 1000;

  if (decoded.exp < now) {
    // token expired
    localStorage.removeItem("token");
    setAuthToken(null);
    navigate("/login");
  } else {
    setAuthToken(token);
  }
} catch (err) {
  console.error("Invalid token:", err);
  localStorage.removeItem("token");
  setAuthToken(null);
  navigate("/login");
}

// Auto logout timer
let timer;
const resetTimer = () => {
  clearTimeout(timer);
  timer = setTimeout(() => {
    localStorage.removeItem("token");
    setAuthToken(null);
    navigate("/login");
    alert("Session expired due to inactivity.");
  }, AUTO_LOGOUT_MINUTES * 60 * 1000);
};

// Reset timer on user activity
window.addEventListener("mousemove", resetTimer);
window.addEventListener("keypress", resetTimer);
window.addEventListener("scroll", resetTimer);

resetTimer(); // start timer immediately

return () => {
  clearTimeout(timer);
  window.removeEventListener("mousemove", resetTimer);
  window.removeEventListener("keypress", resetTimer);
  window.removeEventListener("scroll", resetTimer);
};

}, [navigate]);
};
