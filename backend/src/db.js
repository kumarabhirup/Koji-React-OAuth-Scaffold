// Database
const SteinStore = require('stein-js-client');

const store = new SteinStore("https://api.steinhq.com/v1/storages/5cc158079ec99a2f484dcb40");

module.exports = {
  store,
  authentication: {
    // If you want database to be unsecure, you may change this to an empty object
    username: process.env.STEIN_STORE_USERNAME,
    password: process.env.STEIN_STORE_PASSWORD
  }
}