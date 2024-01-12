const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const gameSchema = new Schema({

    rating: {
        type: Number,
        required: true
    },
    gameId: {
        type: Number,
        required: true,
       
    },
}, {timestamps: true});


module.exports = mongoose.model('game', gameSchema);