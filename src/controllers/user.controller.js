const User = require("../models/user.model");
const Transaction = require("../models/transaction.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const axios = require("axios");

exports.userSignUp = async (req, res) => {
  const session = await mongoose.startSession(); // Start Session
  session.startTransaction(); // start Transaction
  try {
    const {
      first_name,
      last_name,
      email,
      mode_of_learning,
      phone_number,
      course,
      course_amount,
      transaction_id,
      password,
      tx_ref,
      flw_ref,
      status,
    } = req.body;

    console.log(req.body);

    // validate user input
    if (
      !(
        email &&
        first_name &&
        last_name &&
        mode_of_learning &&
        course &&
        phone_number &&
        course_amount &&
        password
      )
    ) {
      return res.status(400).json({
        message: "All input is required",
      });
    }

    // check if user already exist
    const userExist = await User.findOne({
      email,
    });

    if (userExist) {
      return res
        .status(409)
        .json({ message: "User Already Exist. Please Login" });
    }

    // flutter wave payment
    // let txref = tx_ref;
    // let secret_key = process.env.FLUTTER_WAVE_SECRET_KEY;
    // const response = await axios({
    //   method: "post",
    //   data: {
    //     txref,
    //     SECKEY: secret_key,
    //   },
    //   url: `https://api.ravepay.co/flwv3-pug/getpaidx/api/v2/verify`,
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    // });

    // console.log(response.data);
    // if (
    //   response.data.data.status !== "successful" &&
    //   response.data.data.chargecode != "00"
    // ) {
    //   return errorResMsg(res, 500, "User Payment was not successful");
    // }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    // create user in our database
    const user = await User.create({
      first_name,
      last_name,
      email,
      payment_status: "paid",
      mode_of_learning,
      course,
      phone_number,
      course_amount,
      password: hashedPassword,
    });

    // create token
    const token = jwt.sign(
      { user_id: user._id, email },
      process.env.TOKEN_KEY,
      {
        expiresIn: "2h",
      }
    );

    // save  flutterwave transaction details in Transaction model
    // const transaction = await Transaction.create({
    //   flwtransId: transaction_id,
    //   flwRef: flw_ref,
    //   transRef: tx_ref,
    //   paymentStatus: status,
    //   user: user._id,
    //   amount: course_amount,
    //   email: email,
    // });

    // commit transaction
    await session.commitTransaction();
    session.endSession();

    return res.status(201).json({
      status: "success",
      message: "User created successfully",
      user,
      token,
      // transaction,
    });
  } catch (error) {
    console.log(error);
    await session.abortTransaction(); // Abort Transaction
    session.endSession(); // End Session
    return res.status(400).json({
      status: "fail",
      message: error,
    });
  }
};

// update user password if payment is successful
exports.updateUserPassword = async (req, res) => {
  try {
    const { password } = req.body;

    // validate user input
    if (!password) {
      res.status(400).send("All input is required");
    }

    // hash user password
    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);
    const hashedPassword = await bcrypt.hash(password, salt);

    // update user password
    const user = await User.findByIdAndUpdate(
      req.params.id,
      {
        password: hashedPassword,
        payment_status: "paid",
      },
      { new: true }
    );

    return res.status(200).json({
      status: "success",
      message: "User password updated successfully",
      user,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      status: "fail",
      message: error,
    });
  }
};

exports.userLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    // validate user input
    if (!(email && password)) {
      return res.status(400).json({ message: "All input is required" });
    }

    // validate if user exist in our database
    const user = await User.findOne({
      email,
    });

    // check if user has paid for the course
    if (user?.payment_status === "unpaid") {
      return res.status(400).json({
        message: "Please pay for the course, before you can login",
      });
    }

    if (user && (await bcrypt.compare(password, user.password))) {
      // create token
      const token = jwt.sign(
        { user_id: user._id, email },
        process.env.TOKEN_KEY,
        {
          expiresIn: "2h",
        }
      );

      // return user
      return res.status(200).json({
        message: "Login Successful",
        token,
        user,
      });
    }
    return res.status(400).send("Invalid Credentials");
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: "fail",
      message: error,
    });
  }
};
