const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const commentSchema = new Schema({

    text: {
        type: String,
        required: true
    },
    game: {
        type: Number,
        required: true,
        
    },
    username:{
        type: String,
        required: true,
    
    },
    rating: {
        type: Number,
        required: true,
    },

}, {timestamps: true});


module.exports = mongoose.model('Comment', commentSchema);