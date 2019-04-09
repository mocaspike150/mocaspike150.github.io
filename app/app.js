const cors = require('cors');
const express = require('express');
const axios = require('axios');
const path = require('path');
const app = express();
const config = require('./config');

const crowdrise = require('./crowdrise');
const multer  = require('multer');
const upload = multer();
const contact = require('./contact');
const signup = require('./signup');

app.use(cors());

app.use('/', express.static(path.join(__dirname, 'public')))

app.use('/lib', express.static(path.join(__dirname, 'lib')))

app.post('/contact', upload.none(), contact);

app.post('/signup', upload.none(), signup);

app.get('/node.version.json', (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.end(`{ "node": { "version": "${process.version}" } }`);
});

app.get('/axios', (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  axios.get(config.endpoint)
    .then( (response) => {
      res.end(JSON.stringify(response.data));
    })
    .catch((error) => {
      res.end(JSON.stringify(error.response.data));
    });
});

app.get('/posts/:id', (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  url = `${config.endpoint}/wp/v2/posts/${req.params.id}`;
  axios.get(url)
    .then( (response) => {
      res.end(JSON.stringify(response.data));
    })
    .catch((error) => {
      res.end(JSON.stringify(error.response.data));
    });
});

app.get('/pages/:id', (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  url = `${config.endpoint}/wp/v2/pages/${req.params.id}`;
  axios.get(url)
    .then( (response) => {
      res.end(JSON.stringify(response.data));
    })
    .catch((error) => {
      res.end(JSON.stringify(error.response.data));
    });
});

app.get('/media/:id', (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  url = `${config.endpoint}/wp/v2/media/${req.params.id}`;
  axios.get(url)
    .then( (response) => {
      res.end(JSON.stringify(response.data));
    })
    .catch((error) => {
      res.end(JSON.stringify(error.response.data));
    });
});

app.get('/posts', (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  url = `${config.endpoint}/wp/v2/posts`;
  axios.get(url)
    .then( (response) => {
      res.end(JSON.stringify(response.data));
    })
    .catch((error) => {
      res.end(JSON.stringify(error.response.data));
    });
});

app.get('/pages', (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  url = `${config.endpoint}/wp/v2/pages`;
  axios.get(url)
    .then( (response) => {
      res.end(JSON.stringify(response.data));
    })
    .catch((error) => {
      res.end(JSON.stringify(error.response.data));
    });
});

app.get('/crowdrise/0', crowdrise(0));
app.get('/crowdrise/1', crowdrise(1));

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
  console.log('Press Ctrl+C to quit.');
});

