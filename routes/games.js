const express = require("express");

const {
  getAllGames,
  getSingleGame,
  createGame,
  updateGame,
  deleteGame
} = require("../controllers/gameController");

const router = express.Router();
// Get all Games
router.get("/", getAllGames);

// Get a single Game
router.get("/:gid", getSingleGame);

// Create a Game
router.post("/", createGame);

// Update a Game
router.patch("/:gid", updateGame);

// Delete a Game
router.delete("/:gid", deleteGame);
 
module.exports = router;
