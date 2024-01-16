const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");

const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.SECRET);
};

// login a user
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.login(email, password);

    // create a token
    const token = createToken(user._id);

    res.status(200).json({
      email: user.email,
      username: user.username,
      isVerified: user.isVerified,
      token,
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// signup a user
const signupUser = async (req, res) => {
  const { email, username, password } = req.body;

  try {
    const user = await User.signupWithVerification(email, username, password);

    // Send a verification email to the user
    const transporter = nodemailer.createTransport({
      service: "outlook",
      auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD,
      },
    });

    const verificationEmail = {
      from: process.env.EMAIL,
      to: email,
      subject: "Email Verification",
      text: `Click the following link to verify your email: http://localhost:3000/verify/${user.verificationToken}`,
    };

    transporter.sendMail(verificationEmail, (error, info) => {
      if (error) {
        console.error(error);
      } else {
        console.log("Verification email sent:", info);
      }
    });
    const token = createToken(user._id);
    // Respond with a success message or the user object without the token
    res.status(200).json({
      email: user.email,
      username: user.username,
      isVerified: user.isVerified,
      token,
    });
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: error.message });
  }
};

const verifyUser = async (req, res) => {
  const { token } = req.query;

  try {
    // Find the user with the given verification token
    const user = await User.findOne({ verificationToken: token });
  

    // If no user is found with the given token, handle the error
    if (!user) {
      return res.status(404).json({
        error:
          "Invalid verification token, Or your email is already verified !",
      });
    }

    // If the tokens match, set isVerified to true and clear the verificationToken
    user.isVerified = true;
    user.verificationToken = null;

    // Save the updated user
    await user.save();

    // Respond with a success message or the user object without sensitive information
    res.status(200).json({
      message: "Email verification successful",
      email: user.email,
      username: user.username,
      isVerified: user.isVerified,
      token,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// get favourite games of a user
const getFavouriteGames = async (req, res) => {
  const { username } = req.params;
  try {
    const favouriteGames = await User.getFavouriteGames(username);
    res.status(200).json(favouriteGames);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//add a favourite game to a user
const addFavouriteGame = async (req, res) => {
  const { username, game } = req.body;

  try {
    const FavouriteGames = await User.addFavouriteGame(username, game);
    res.status(200).json(FavouriteGames);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//remove a favourite game from a user
const removeFavouriteGame = async (req, res) => {
  const { username, game } = req.body;

  try {
    const FavouriteGames = await User.removeFavouriteGame(username, game);
    res.status(200).json(FavouriteGames);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  signupUser,
  loginUser,
  verifyUser,
  getFavouriteGames,
  addFavouriteGame,
  removeFavouriteGame,
};
