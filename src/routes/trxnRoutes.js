const express = require("express");
const { postTrxn , getTrxn, updateTrxn, deleteTrxn } = require("../controllers/trxnControllers");
const router = express.Router();


router.route("/")
		.get(getTrxn)
        .post(postTrxn)

router.route("/update")
        .put(updateTrxn)

router.route("/delete")
        .delete(deleteTrxn)

module.exports = router;