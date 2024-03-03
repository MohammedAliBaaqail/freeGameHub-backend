require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const middlewares = require('./middlewares');
const commentsRoutes = require('./api/comments');
const userRoutes = require('./api/user');

const port = process.env.PORT || 3000;

const app = express();

const corsOptions = {
    origin: '*',
};

app.use(cors(corsOptions)); // Applying cors middleware first

app.use((req, res, next) => {
    res.setHeader('Permissions-Policy', 'interest-cohort=(), attribution-reporting=*, run-ad-auction=*, join-ad-interest-group=*, browsing-topics=*');
    next();
});

app.use(express.json());
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Internal Server Error');
});

app.use('/game/comments', commentsRoutes);
app.use('/user', userRoutes);

app.use(middlewares.notFound);
app.use(middlewares.errorHandler);

const connectionString = process.env.DATABASE_URL;
mongoose.set('strictQuery', false);
mongoose.connect(connectionString);

app.listen(port, () => {
    console.log('Connected to db and listening on port', port);
});

module.exports = app;
