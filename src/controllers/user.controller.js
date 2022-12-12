const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const sendEmail = require("../utils/email ");
const { registrationTemplate } = require("../utils/template/welcome");
const db = require("../database/db");

// user sign up
exports.userSignUp = async (req, res) => {
  try {
    const {
      first_name,
      last_name,
      email,
      mode_of_learning,
      phone_number,
      course,
      course_amount,
      password,
      payment_status,
    } = req.body;

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
    const oldUser = await db.query("SELECT * FROM users WHERE email = ?", [
      email,
    ]);

    if (oldUser[0].length) {
      return res.status(409).json({
        message: "User Already Exist. Please Login",
      });
    }

    // hash user password
    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);
    const hashedPassword = await bcrypt.hash(password, salt);

    // create user in our database
    const user = await db.query(
      "INSERT INTO users (first_name, last_name, email, mode_of_learning, phone_number, course, course_amount, password, payment_status) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)",
      [
        first_name,
        last_name,
        email,
        mode_of_learning,
        phone_number,
        course,
        course_amount,
        hashedPassword,
        payment_status,
      ]
    );

    // send welcome email to user
    await sendEmail({
      email,
      subject: "Welcome to the course",
      text: "Welcome to the course",
      html: await registrationTemplate(
        first_name,
        last_name,
        course,
        mode_of_learning,
        course_amount,
        user[0].insertId
      ),
    });

    // create token
    const token = jwt.sign(
      { user_id: user[0].insertId, email },
      process.env.TOKEN_KEY,
      {
        expiresIn: "2h",
      }
    );

    return res.status(201).json({
      status: "success",
      token,
      message: "User registered successfully",
      user_id: user[0].insertId,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: "fail",
      message: error.message,
    });
  }
};

// user login
exports.userLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    // validate user input
    if (!(email && password)) {
      return res.status(400).json({ message: "All input is required" });
    }

    // validate if user exist in our database
    const user = await db.query("SELECT * FROM users WHERE email = ?", [email]);

    if (
      user[0].length &&
      (await bcrypt.compare(password, user[0][0].password))
    ) {
      // create token
      const token = jwt.sign(
        { user_id: user[0][0].id, email },
        process.env.TOKEN_KEY,
        {
          expiresIn: "2h",
        }
      );

      return res.status(200).json({
        status: "success",
        token,
        message: "User logged in successfully",
        user_id: user[0][0].id,
      });
    } else {
      return res.status(400).json({ message: "Invalid credentials" });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: "fail",
      message: error,
    });
  }
};

// user forgot password
exports.userForgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    // validate user input
    if (!email) {
      return res.status(400).json({ message: "All input is required" });
    }

    // validate if user exist in our database
    const user = await db.query("SELECT * FROM users WHERE email = ?", [email]);

    if (!user[0].length) {
      return res.status(400).json({ message: "User does not exist" });
    }

    // create reset token
    const token = jwt.sign(
      { user_id: user[0][0].id, email },
      process.env.TOKEN_KEY,
      {
        expiresIn: "5m",
      }
    );

    if (!token) {
      return res.status(400).json({ message: "Token not generated" });
    }

    // save token to database
    await db.query(
      "UPDATE users SET reset_password_token = ? WHERE email = ?",
      [token, email]
    );

    // reset link

    const resetUrl = `${process.env.CLIENT_URL}/reset-password/${token}`;

    // send email to user
    await sendEmail({
      email,
      subject: "Reset your password",
      text: "Reset your password: ${resetUrl}",
      html: ` <a href=${resetUrl} clicktracking=off>${resetUrl}</a> `,
    });

    return res.status(200).json({
      status: "success",
      message: "Password reset link sent to your email",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: "fail",
      message: error,
    });
  }
};

// user reset password
exports.userResetPassword = async (req, res) => {
  try {
    const { password } = req.body;

    // validate user input
    if (!password) {
      return res.status(400).json({ message: "All input is required" });
    }

    // validate if user exist in our database
    const user = await db.query(
      "SELECT * FROM users WHERE reset_password_token = ?",
      [req.params.token]
    );

    if (!user[0].length) {
      return res.status(400).json({ message: "User does not exist" });
    }

    // hash user password
    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);
    const hashedPassword = await bcrypt.hash(password, salt);

    // update user password
    await db.query(
      "UPDATE users SET password = ?, reset_password_token = ? WHERE reset_password_token = ?",
      [hashedPassword, null, req.params.token]
    );

    return res.status(200).json({
      status: "success",
      message: "Password reset successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: "fail",
      message: error,
    });
  }
};
