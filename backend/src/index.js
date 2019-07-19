/**
 * src/index.js
 * 
 * What it Does:
 *   This file is the entrypoint of backend. 
 *   It does all the needed API and server connecting stuffs.
 * 
 * Things to Change:
 *   If you want to add new route, you may do that from here.
 */

require('dotenv').config();
require('babel-polyfill');
const app = require('express')();
const bodyParser = require('body-parser');

// Routes
const userRoutes = require('./routes/userRoutes');

// Body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  limit: '2mb',
  extended: true
}));

// CORS
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization, X-Jiro-Request-Tag');
  next();
});

// When you visit http://localhost:3001, you see this 👇
app.get('/', (req, res) => {
  res.send(`<h1 style="font-family: sans-serif;">WTF are you doin' here?</h1>`, 200)
});

// Routes which should handle requests
app.use("/users", userRoutes);

// LISTEN the designated port or 3001
app.listen(process.env.PORT || 3001);
