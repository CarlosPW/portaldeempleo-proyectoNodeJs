const express = require("express");

const { isAuth, isAdmin, renewToken } = require("../middleware/Auth");

const {
	addRequest,
	removeRequest,
	updateRequest,
	getRequests,
} = require("../controller/request_controller");

const router = express.Router();

router.get("/requests", isAuth, getRequests);
router.post("/addrequest/:userID", isAuth, addRequest);
router.put("/updaterequest/:requestID", isAuth, isAdmin, updateRequest);
router.delete("/removerequest/:requestID", isAuth, removeRequest);

module.exports = router;
