const mongoose = require('mongoose');

const { MONGO_URI_PROD } = process.env;

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(MONGO_URI_PROD);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

module.exports = connectDB;