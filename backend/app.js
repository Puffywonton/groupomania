
const express = require('express');
const helmet = require("helmet");
const mongoose = require('mongoose');

const billRoutes = require('./routes/bill');
const userRoutes = require('./routes/user');
const path = require('path');

const app = express();

app.use(express.json());

app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));

mongoose.connect(process.env.MOONGOOSE,
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

app.use('/api/billboard', billRoutes);
app.use('/api/auth', userRoutes);
app.use('/images', express.static(path.join(__dirname, 'images')));

module.exports = app;