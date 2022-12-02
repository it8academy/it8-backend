require("dotenv").config()
const express = require('express');
const morgan  = require("morgan")
const connectDB = require("./database/db");
const authRoutes = require("./routes/user.routes");
const cors = require("cors")
const app = express();

const port = process.env.PORT || 3456;

connectDB();


app.use(cors());
app.use(express.json());
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.get("/", (req, res) => {
  res.status(200).json("welcome to it8");
});

app.use("/api/v1/auth", authRoutes);

app.listen(port, () => {
    console.log(`Server is running on port http://localhost:${port}`);
});
    

