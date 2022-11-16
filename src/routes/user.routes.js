const express = require('express');

const router = express.Router();

router.post("/register", userSignUp)


module.exports = router;