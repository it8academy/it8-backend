const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    first_name: {
      type: String,
      required: true,
    },
    last_name: {
      type: String,
      required: true,
      unique: true,
    },
    phone_number: {
      type:String,
    },
    password: {
      type: String,
    },
    avatar: {
      type: String,
    },
    email: {
      type: String,
      required: true,
    },
    state: {
      type: String,
      required: true,
    },
    country: {
      type: String,
      required: true,
    },
    course: {
      type: String,
      required: true,
      enum: [
        "frontend engineering",
        "backend engineering",
        "mobile development",
        "brand identity design",
        "product design",
        "product management",
      ],
    },
    course_amount: {
      type: Number,
    },
    mode_of_learning: {
      type: String,
      enum: ["online", "physical"],
      default: "online",
    },
    payment_status: {
      type: String,
      enum: ["paid", "unpaid"],
      default: "unpaid",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", userSchema);
