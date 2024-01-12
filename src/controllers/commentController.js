const Comment = require("../models/commentModel");
const mongoose = require('mongoose');

//get all comments


const getAllComments = async (req, res) => {
    // const game = req.game
    const {gid} = req.params;

    const comments = await Comment.find({game:gid}).sort({createdAt: -1});

    // const comments = await Todo.find({game}).sort({createdAt: -1});
    res.status(200).json(comments);
}

//get a single comment


const getSingleComment = async (req, res) => {
    const {cid} = req.params;
    if (!mongoose.Types.ObjectId.isValid(cid)) {
        return res.status(404).json({error: 'Invalid id'});
    }
    const comment = await Comment.findById(cid);

    if(!comment){
        return res.status(404).json({msg: 'comment not found'});
    }

    res.status(200).json(comment); 
}



//create a comment
const createComment = async (req, res) => {
    const { text, game, username , rating } = req.body;
    let emptyFields = [];
    if (!text) emptyFields.push('text');
    if (!rating) emptyFields.push('rating');
    if (emptyFields.length > 0) {
      return res.status(400).json({ error: 'Please fill in the following fields:', emptyFields })
      }


    try {
      const comment = await Comment.create({ text, game, username , rating });
      res.status(200).json(comment);
    } catch (err) {
      res.status(400).json({ msg: err.message });
    }
    };


//update a comment


const updateComment = async (req, res) => {
    const { cid } = req.params
  
    if (!mongoose.Types.ObjectId.isValid(cid)) {
      return res.status(400).json({error: 'No such comment'})
    }
  
    const comment = await Comment.findOneAndUpdate({_id: cid}, {
      ...req.body
    })
  
    if (!comment) {
      return res.status(400).json({error: 'No such comment'})
    }
    const newComment = await Comment.findById(cid)
    res.status(200).json(newComment)
  }



//delete a comment


const deleteComment = async (req, res) => {
    const {cid} = req.params;
    if (!mongoose.Types.ObjectId.isValid(cid)) {
        return res.status(404).json({error: 'Invalid id'});
    }
    const comment = await Comment.findByIdAndDelete({_id: cid});

    if(!comment){
        return res.status(404).json({error: 'comment not found'});
    }

    res.status(200).json(comment); 
}


module.exports = {
    getAllComments,
    getSingleComment,
    createComment,
    updateComment,
    deleteComment
};