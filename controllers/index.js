const express = require('express');
const router = express.Router();

const movieObject = require('./movieController');

router.get('/', (request, response) => {
  response.render('index', {
    title: 'Home page',
    heading: 'Movie - CRUD',
    style: 'home.css'
  });
});

router.use('/movies', movieObject);

module.exports = router;
