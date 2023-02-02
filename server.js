require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
cors = require('cors');
const commentsRoutes = require('./routes/comments');
// const gamesRoutes = require('./routes/games');
const userRoutes = require('./routes/user')

const port = process.env.PORT || 3000;
// Create express app
const app = express();

//middleware
app.use(express.json());

//routes
app.use('/game/comments' ,commentsRoutes);
// app.use('/games' ,gamesRoutes);
app.use('/user', userRoutes);

// Connect to MongoDB
const connectionString = process.env.DATABASE_URL;
mongoose.set('strictQuery', false);
mongoose.connect(connectionString)
    .then(() => {
        app.listen(port, () => {
            console.log('connected to db and listening on port ' , port );
        })
    })
    .catch(err => console.log(err));


