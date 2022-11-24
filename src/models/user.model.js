const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    first_name: {
      type: String,
      required: [true, "Please provide your first name"],
    },
    last_name: {
      type: String,
      required: [true, "Please provide your last name"],
      unique: [true, "Please provide your last name"],
    },
    phone_number: {
      type: String,
      required: [true, "Please provide your phone number"],
    },
    password: {
      type: String,
      required: [true, "Please provide a password"],
    },
  
    email: {
      type: String,
      required: [true, "Please provide your email"],
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
