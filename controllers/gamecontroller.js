const Game = require("../models/gameModel");
const mongoose = require('mongoose');

//get all games


const getAllGames = async (req, res) => {


    const games = await Game.find({}).sort({createdAt: -1});

   
    res.status(200).json(games);
}

//get a single game


const getSingleGame = async (req, res) => {
    const {gid} = req.params;
    if (!mongoose.Types.ObjectId.isValid(gid)) {
        return res.status(404).json({error: 'Invalid id'});
    }
    const game = await Game.findById(gid);

    if(!game){
        return res.status(404).json({msg: 'game not found'});
    }

    res.status(200).json(game); 
}



//create a game
const createGame = async (req, res) => {
    const {  gameId , rating } = req.body;

    try {
      const game = await Game.create({ gameId , rating });
      res.status(200).json(game);
    } catch (err) {
      res.status(400).json({ msg: err.message });
    }
    };


//update a game


const updateGame = async (req, res) => {
    const { cid } = req.params
  
    if (!mongoose.Types.ObjectId.isValid(cid)) {
      return res.status(400).json({error: 'No such game'})
    }
  
    const game = await Game.findOneAndUpdate({_id: cid}, {
      ...req.body
    })
  
    if (!game) {
      return res.status(400).json({error: 'No such game'})
    }
  
    res.status(200).json(game)
  }



//delete a game


const deleteGame = async (req, res) => {
    const {cid} = req.params;
    if (!mongoose.Types.ObjectId.isValid(cid)) {
        return res.status(404).json({error: 'Invalid id'});
    }
    const game = await Game.findByIdAndDelete({_id: cid});

    if(!game){
        return res.status(404).json({msg: 'game not found'});
    }

    res.status(200).json(game); 
}


module.exports = {
    getAllGames,
    getSingleGame,
    createGame,
    updateGame,
    deleteGame
};