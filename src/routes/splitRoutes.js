const express = require("express");
const { postSplit , getSplit, updateIsPaid, deleteSplit } = require("../controllers/splitControllers");
const router = express.Router();


router.route("/")
	.get(getSplit)
        .post(postSplit)

router.route("/update")
        .put(updateIsPaid)

router.route("/delete")
        .delete(deleteSplit)

module.exports = router;