'use strict';

const express = require('express');
const app = express();
const port = 8080;

const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const exphbs = require('express-handlebars');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static('public'));

app.engine('handlebars', exphbs({extname:'handlebars', defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

app.use(require('./controllers/index'));
// Error handler
app.use((err, request, response, next) => {
  // Render the error page
  response.status(err.status || 500);
  response.render('error', {
    message: err.message,
    error: err
  });
});

// Connect to MongoDB
mongoose.connect('mongodb://localhost/crud-db', {useNewUrlParser: true});
mongoose.connection.on('connected', () => {
  console.log('MongoDB connection successful');
  // Listen to port
  app.listen(port, (err) => {
      if(!err) {
          console.log(`App is running on port ${port}`);
      } else {
          console.log(`Port ${port} is already used`);
      }
  });
}).on('error', (error) => {
  console.log('MongoDB connection failed due to the error: ', error);
}).on('disconnected', () => {
  console.log('MongoDB connection disconnected');
});
