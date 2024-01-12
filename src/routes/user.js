const express = require('express')

// controller functions
const { loginUser, signupUser } = require('../controllers/userController')
const { getFavouriteGames, addFavouriteGame, removeFavouriteGame } = require('../controllers/userController')

const requireAuth = require('../middleware/requireAuth')

const router = express.Router()

// login route
router.post('/login', loginUser)

// signup route
router.post('/signup', signupUser)

// Protect all routes after this middleware
// router.use(requireAuth)
// get favourite games of a user
router.get('/getFavouriteGames/:username', getFavouriteGames)

//add a favourite game to a user
router.post('/addFavouriteGame', addFavouriteGame)

//remove a favourite game from a user
router.patch('/removeFavouriteGame', removeFavouriteGame)

module.exports = router