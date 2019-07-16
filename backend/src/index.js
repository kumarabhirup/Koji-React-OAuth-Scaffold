/**
 * backend/index.js
 * 
 * What it Does:
 *   This file is the entrypoint of backend.
 *   What it essentially does, is connect you to the Stein database.
 * 
 * Things to Change:
 *   There's nothing to change here as per now.
 */

require('dotenv').config()
require('babel-polyfill');
const app = require('express')();
const bodyParser = require('body-parser');

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

app.get('/', (req, res) => {
  res.send(`<h1 style="font-family: sans-serif;">WTF are you doin' here?</h1>`, 200)
})



app.listen(process.env.PORT || 3001)
