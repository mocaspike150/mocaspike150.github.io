const config = require('./config');
const axios = require('axios');

const crowdrise = (id) => {
  return (req, res) => {
    axios.get(config.crowdrise.url[id])
    .then( (response) => {
      res.end(response.data);
    })
    .catch((error) => {
      res.end(JSON.stringify(error.response.data));
    });
  }
}

module.exports = crowdrise;
