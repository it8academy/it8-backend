require("dotenv").config()
const express = require('express');
const morgan  = require("morgan")
const connectDB = require("./database/db");
const app = express();

const port = process.env.PORT || 3456;

connectDB();

app.use(express.json());
if (process.env.NODE_ENV === "development") {
    app.use(morgan('dev'))
}

app.get("/", (req, res) => {
    res.status(200).json("welcome to it8")
})

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
    

