require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const middlewares = require('./middlewares');
const commentsRoutes = require('./api/comments');
// const gamesRoutes = require('./routes/games');
const userRoutes = require('./api/user')

const port = process.env.PORT || 3000;
// Create express app
const app = express();
app.use((req, res, next) => {
    res.setHeader('Permissions-Policy', 'interest-cohort=(), attribution-reporting=*, run-ad-auction=*, join-ad-interest-group=*, browsing-topics=*');
    next();
  });
  const corsOptions = {
    origin: '*',
};

app.use(cors(corsOptions));
//middleware
app.use(express.json());
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Internal Server Error');
  });
//routes
app.use('/game/comments' ,commentsRoutes);
// app.use('/games' ,gamesRoutes);
app.use('/user', userRoutes);

app.use(middlewares.notFound);
app.use(middlewares.errorHandler);
// Connect to MongoDB
const connectionString = process.env.DATABASE_URL;
mongoose.set('strictQuery', false);
mongoose.connect(connectionString)
    // .then(() => {
    //     app.listen(port, () => {
    //         console.log('connected to db and listening on port ' , port );
    //     })
    // })
    // .catch(err => console.log(err));

module.exports = app;
