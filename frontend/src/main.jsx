import ReactDOM from "react-dom/client";
import { attachAuthInterceptor } from "./api/axios";
import App from "./App.jsx";
import "./index.css";

attachAuthInterceptor();

ReactDOM.createRoot(document.getElementById("root")).render(
      <App />
);
