const express = require("express");

const { isAuth, isAdmin } = require("../middleware/Auth");

const {
	addPost,
	removePost,
	updatePost,
	getPosts,
} = require("../controller/post_controller");

const router = express.Router();

router.get("/posts", isAuth, getPosts);
router.post("/addpost/:userID", isAuth, addPost);
router.delete("/removepost/:postID", isAuth, removePost);
router.put("/updatepost/:postID", isAuth, isAdmin, updatePost);

module.exports = router;
