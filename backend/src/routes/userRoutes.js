/** 
 * src/routes/userRoutes.js
 * 
 * What it Does:
 *   It routes the /user API, signs get/post methods to the routes
 *   and determines the appropriate controller for the API request.
 * 
 * Things to Change:
 *  /getUser probably shouldn't be a POST request, you might need to change it to GET. [Note: doing it will need you to make changes in the frontend]
 *  You may add more user routes for additional features.
 */

const express = require("express");
const router = express.Router();

const UserController = require('../controllers/userController');

router.post("/signin", UserController.signIn);
router.post("/getUser", UserController.getUser);

module.exports = router;