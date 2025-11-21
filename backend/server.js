// server.js
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const connectDB = require("./src/config/db.js");

const projectRoutes = require("./src/routes/projectRoutes.js");
const financeRoutes = require("./src/routes/financeRoutes.js");
const communityRoutes = require("./src/routes/communityRoutes.js");
const materialRoutes = require("./src/routes/materialRoutes.js");
const marketplaceRoutes = require("./src/routes/marketplaceRoutes.js");
const authRoutes = require("./src/routes/authRoutes.js");
const chatRoutes = require("./src/routes/chatRoutes.js");

//connect database
connectDB();

const app = express();

app.use(cors({ origin: [ "http://localhost:5173",
  "https://mern-final-project-arynjeri-dz4j.vercel.app/" ],
  credentials: true
 }));
app.use(express.json());
app.use(morgan("dev"));

// Routes
app.use("/api/projects", projectRoutes);
app.use("/api/finance", financeRoutes);
app.use("/api/community", communityRoutes);
app.use("/api/materials", materialRoutes);
app.use("/api/marketplace", marketplaceRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/chat", chatRoutes);
app.use("/uploads", express.static("uploads"));


app.get("/test", (req, res) => {
  console.log("Frontend called /test route");
  res.json({ message: "Backend working" });
});


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
