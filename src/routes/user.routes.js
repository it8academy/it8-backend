const express = require('express');
const {
  userLogin,
  userSignUp,
  userForgotPassword,
  userResetPassword,
} = require("../controllers/user.controller");

const router = express.Router();

router.post("/register", userSignUp);
router.post("/login", userLogin);
router.post("/forgot-password", userForgotPassword);
router.put("/reset-password/:token", userResetPassword);



module.exports = router;