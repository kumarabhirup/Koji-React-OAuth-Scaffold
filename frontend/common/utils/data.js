/**
 * @description This file creates the Axios Base API instance for the client to fetch data from backend
 * Things to change - To alter the base URL, change the Koji `backendUrl` string in the `.koji/customization/strings.json`
 */

import axios from 'axios';
import Koji from 'koji-tools';

const instance = axios.create({
  baseURL: Koji.config.strings.backendUrl
});

export default instance;