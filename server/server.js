const express = require("express");
const mongoose = require("mongoose");
const app = express();

// DEBUG: log every incoming request
app.use((req, res, next) => {
  console.log("➡️ INCOMING:", req.method, req.originalUrl);
  next();
});

// CORS middleware - MUST be before routes
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");

  if (req.method === "OPTIONS") {
    return res.sendStatus(200);
  }
  next();
});

app.use(express.json());

// ALL ROUTES API CALLING IS HEAR
const authRoutes = require("./routes/authRoutes");
app.use("/api/auth", authRoutes);

const policeRoutes = require("./routes/policeRoute");
app.use("/api/police", policeRoutes);

const hospitalRoutes = require("./routes/hospitalRoute");
app.use("/api/hospital", hospitalRoutes);

const fireRoutes = require("./routes/fireRoute");
app.use("/api/fire", fireRoutes);

app.get("/", (req, res) => {
  res.send("RAKSHA API Server is running!Yupppppppppp🥳");
});

mongoose
  .connect("mongodb://localhost:27017/apitestrakshak")
  .then(() => {
    console.log("MongoDB Connect Thi Gayuuu Cheee Yuppppp");
    app.listen(5001, () => console.log("Server live on http://localhost:5001"));
  })
  .catch((err) => console.log(" DB Not Concected 🥱: ", err));
