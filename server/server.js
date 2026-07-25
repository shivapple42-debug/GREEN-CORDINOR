const express = require("express");
const mongoose = require("mongoose");

const app = express();
app.use(express.json());


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

const authRoutes = require("./routes/authRoutes");
app.use("/api/auth", authRoutes);

app.get("/", (req, res) => {
  res.send("RAKSHA API Server is running!");
});

mongoose
  .connect("mongodb://localhost:27017/raksha_db")
  .then(() => {
    console.log(" MongoDB Connect Thi Gayuuu Cheee Yuppppp");
    app.listen(5001, () => console.log("Server live on http://localhost:5001"));
  })
  .catch((err) => console.log(" DB Not Concected 🥱: ", err));
