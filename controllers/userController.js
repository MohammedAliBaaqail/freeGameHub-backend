const User = require('../models/userModel')
const jwt = require('jsonwebtoken')

const createToken = (_id) => {
  return jwt.sign({_id}, process.env.SECRET, { expiresIn: '3d' })
}

// login a user
const loginUser = async (req, res) => {
  const {email, password} = req.body


  try {
    const user = await User.login(email, password)
    const username = user.username
    // create a token
    const token = createToken(user._id)

    res.status(200).json({email,username, token})
  } catch (error) {
    res.status(400).json({error: error.message})
  }
}

// signup a user
const signupUser = async (req, res) => {
  const {email,username, password} = req.body

  try {
    const user = await User.signup(email,username, password)

    // create a token
    const token = createToken(user._id)

    res.status(200).json({email, username,token})
  } catch (error) {
    res.status(400).json({error: error.message})
  }
}
// get favourite games of a user
const getFavouriteGames = async (req, res) => {
  const {username} = req.params
  try {
  const favouriteGames = await User.getFavouriteGames(username)
  res.status(200).json(favouriteGames)
  } catch (error) {
    res.status(400).json({error: error.message})
  }
}


//add a favourite game to a user
const addFavouriteGame = async (req, res) => {
  const {username, game} = req.body

  try {
    const FavouriteGames = await User.addFavouriteGame(username, game)
    res.status(200).json(FavouriteGames)
  } catch (error) {
    res.status(400).json({error: error.message})
  }
}

//remove a favourite game from a user
const removeFavouriteGame = async (req, res) => {
  const {username, game} = req.body

  try {
    const FavouriteGames = await User.removeFavouriteGame(username, game)
    res.status(200).json(FavouriteGames)
  } catch (error) {
    res.status(400).json({error: error.message})
  }
}

module.exports = { signupUser, loginUser,getFavouriteGames, addFavouriteGame, removeFavouriteGame }