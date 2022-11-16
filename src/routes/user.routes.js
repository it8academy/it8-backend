const express = require('express');
const {
  userLogin,
  userSignUp,
  updateUserPassword,
} = require("../controllers/user.controller");

const router = express.Router();

router.post("/register", userSignUp);
router.post("/login", userLogin);
router.put("/update-password/:id", updateUserPassword);


module.exports = router;