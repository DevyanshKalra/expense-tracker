const express = require("express");
const { registerUser, loginUser, getBudget , postBudget } = require("../controllers/userControllers");
const router = express.Router();


router.route("/register")
		.post(registerUser)

router.route("/login")
		.post(loginUser)

router.route('/budget')
        .get(getBudget)
        .post(postBudget)

module.exports = router;