const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MovieSchema = new Schema({
  title: String,
  description: String,
  year: Number,
  director: String
});

const Movie = mongoose.model('movie', MovieSchema)

module.exports = Movie;
