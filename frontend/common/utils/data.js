import axios from 'axios';
import Koji from 'koji-tools';

const instance = axios.create({
  baseURL: Koji.config.strings.backendUrl
});

export default instance;