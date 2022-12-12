require("dotenv").config()
const express = require("express");
const authRoutes = require("./routes/user.routes");
const connection = require("./database/db");
const cors = require("cors");
const helmet = require("helmet");
const compression = require("compression");
const app = express();

const port = process.env.APP_PORT || 3456;

app.use(cors());
app.use(express.json());
app.use(helmet());
app.use(compression());

app.get("/", (req, res) => {
  res.status(200).json("welcome to it8");
});

app.use("/api/v1/auth", authRoutes);

// 404 handler
app.use((req, res, next) => {
  const error = new Error("Not found");
  error.status = 404;
  next(error);
});

// Error handler
app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message,
    },
  });
});


app.listen(port, () => {
    console.log(`Server is running on port http://localhost:${port}`);
});
    

