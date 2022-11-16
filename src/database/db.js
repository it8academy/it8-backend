const mongoose = require('mongoose');

const db_uri = (process.env.NODE_ENV = "development"
  ? process.env.MONGO_URI
  : process.env.MONGO_URI_PROD); 

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(db_uri);
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
}

module.exports = connectDB;