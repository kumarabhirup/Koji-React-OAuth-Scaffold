const express = require("express");
const router = express.Router();

const UserController = require('../controllers/userController');

router.post("/signin", UserController.signIn);

module.exports = router;