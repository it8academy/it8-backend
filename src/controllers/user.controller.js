const User = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.userSignUp = async (req, res) => {
  try {
    const {
      first_name,
      last_name,
      avatar,
      email,
      state,
      country,
      mode_of_learning,
    } = req.body;

    // validate user input
    if (
      !(
        email &&
        first_name &&
        last_name &&
        state &&
        country &&
        mode_of_learning
      )
    ) {
      res.status(400).send("All input is required");
    }

    // check if user already exist
    const userExist = await User.findOne({
      email,
      phone_number,
    });

    if (userExist) {
      return res.status(409).send("User Already Exist. Please Login");
    }

    // create user in our database
    const user = await User.create({
      first_name,
      last_name,
      avatar,
      email,
      state,
      country,
      payment_status: "unpaid",
      mode_of_learning,
    });

    // create token
    const token = jwt.sign(
      { user_id: user._id, email },
      process.env.TOKEN_KEY,
      {
        expiresIn: "2h",
      }
    );

    return res.status(201).json({
      message: "User created successfully",
      token,
      user,
    });
  } catch (error) {
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
      res.status(400).send("All input is required");
    }

    // validate if user exist in our database
    const user = await User.findOne({
      email,
    });

    // check if user has paid for the course
    if (user.payment_status === "unpaid") {
      return res.status(400).send("Please pay for the course");
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
    return res.status(400).json({
      status: "fail",
      message: error,
    });
  }
};
