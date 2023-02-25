const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const validator = require('validator')

const Schema = mongoose.Schema

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    
  },
  username: {
    type: String,
    required: true,
    unique: true,
    minlength: 3,
    maxlength: 20,
    
  },
  password: {
    type: String,
    required: true
  },
  favouriteGames: {
    type: Array,
    
    default: []
  },
})

// static signup method
userSchema.statics.signup = async function(email,username, password) {

  // validation
  if (!email || !password || !username) {
    throw Error('All fields must be filled')
  }
  if (!validator.isEmail(email)) {
    throw Error('Your Email is not valid')
  }
  if (!validator.isStrongPassword(password)) {
    throw Error('Your Password is not strong enough , make sure to use at least 8 characters, one uppercase, one lowercase, one number and one special character')
  }

  const existsEmail = await this.findOne({ email })
  const existsUsername = await this.findOne({ username })

  if (existsEmail) {
    throw Error('Email already in use')
  }
  if (existsUsername) {
    throw Error('Username already in use')
  }

  const salt = await bcrypt.genSalt(10)
  const hash = await bcrypt.hash(password, salt)

  const user = await this.create({ email, username , password: hash })

  return user
}

// static login method
userSchema.statics.login = async function(email, password) {

  if (!email || !password) {
    throw Error('All fields must be filled')
  }

  const user = await this.findOne({ email })
  if (!user) {
    throw Error('Incorrect email')
  }

  const match = await bcrypt.compare(password, user.password)
  if (!match) {
    throw Error('Incorrect password')
  }

  return user
}
userSchema.statics.getFavouriteGames = async function(username) {
  const user = await this.findOne({ username })

  if (!user) {
    throw Error('Incorrect username')
  }
  return user.favouriteGames
}


userSchema.statics.addFavouriteGame = async function(username, game) {
  const user = await this.findOne({ username })
  
  if (!user) {
    throw Error('Incorrect username')
  }
  const favouriteGames = user.favouriteGames
  // check if game is already in favouriteGames
  const gameExists = favouriteGames.find(favouriteGame => favouriteGame === game)
  if (gameExists) {
    throw Error('Game already in favourites')
  }

  favouriteGames.push(game)
  const updatedUser = await this.findOneAndUpdate({ username }, { favouriteGames }, { new: true })
  return updatedUser.favouriteGames
  

}

userSchema.statics.removeFavouriteGame = async function(username, game) {
  const user = await this.findOne({ username })
  if (!user) {
    throw Error('Incorrect username')
  }
  console.log(user)
  const favouriteGames = user.favouriteGames.filter(favouriteGame => favouriteGame !== game)

  const updatedUser = await this.findOneAndUpdate({ username }, { favouriteGames }, { new: true })
  return updatedUser.favouriteGames

}


module.exports = mongoose.model('User', userSchema)