const express = require("express");

const {
  getAllComments,
  getSingleComment,
  createComment,
  updateComment,
  deleteComment,
} = require("../controllers/commentController");

const requireAuth = require('../middleware/requireAuth')


const router = express.Router();




// Get all comments
router.get("/:gid", getAllComments);

// Get a single comment
router.get("/:cid", getSingleComment);

// Protect all routes after this middleware
router.use(requireAuth)

// Create a comment
router.post("/", createComment);

// Update a comment
router.patch("/:cid", updateComment);

// Delete a comment
router.delete("/:cid", deleteComment);
 
module.exports = router;
