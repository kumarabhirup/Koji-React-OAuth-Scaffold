/** 
 * src/db.js
 * 
 * What it Does:
 *   This file exports the Stein database instance.
 * 
 * How to use this file:
 *   Sign up on https://steinhq.com
 *   Read the README.md to see how to use Google Spreadsheets with Stein.
 *   
 *   For correct use of .env, refer .sample.env and README.md!
 *   Put the Stein API url in this file for in .env file. Use [STEIN_STORE] environment variable.
 *   Put the Stein API auth credentials in this file for in .env file. Use [STEIN_STORE_USERNAME, STEIN_STORE_PASSWORD] environment variable.
 */

// Database
const SteinStore = require('stein-js-client');

const store = new SteinStore(process.env.STEIN_STORE);

module.exports = {
  store,
  authentication: {
    // If you want database to be unsecure, you may change this to an empty object
    username: process.env.STEIN_STORE_USERNAME,
    password: process.env.STEIN_STORE_PASSWORD
  }
}