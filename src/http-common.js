import axios from 'axios';

//baseURL needs to match domain and port of express server, not the CORS whitelist
export default axios.create({
  baseURL: 'http://192.168.0.145:8080/',
  headers: {
    'Content-type': 'application/json',
  },
});
