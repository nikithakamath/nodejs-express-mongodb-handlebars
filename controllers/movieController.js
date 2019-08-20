'use strict';
const express = require('express');
const router = express.Router();

const Movie = require('../models/movie');

class MovieController {
  addMovie(request, response) {
    response.render('movies/add');
  }

  listMovies(request, response) {
    Movie.find({})
      .then((movies) => {
        response.render('movies/index', {movies: movies});
      })
      .catch((error) => {
        response.render('error', {
          message: error.message,
          error: error
        });
      });
  }

  saveMovie(request, response) {
    let newMovie = new Movie(request.body);
    newMovie.save()
      .then((data) => {
        response.redirect('/movies/display/'+data._id);
      })
      .catch((error) => {
        response.render('movies/add');
      });
  }

  displayMovie(request, response) {
    Movie.findOne({_id: request.params.id})
    .then((movie) => {
      response.render('movies/display', {movie: movie});
    })
    .catch((error) => {
      response.render('error', {
        message: error.message,
        error: error
      });
    });
  }

  editMovie(request, response) {
    Movie.findOne({_id: request.params.id})
    .then((movie) => {
      response.render('movies/edit', {movie: movie});
    })
    .catch((error) => {
      response.render('error', {
        message: error.message,
        error: error
      });
    });
  }

  updateMovie(request, response) {
    Movie.findOneAndUpdate(
      {_id: request.params.id},
      {$set:
        {title: request.body.title,
        description: request.body.description,
        director: request.body.director,
        year: request.body.year}
      },
      {new: true})
    .then((movie) => {
      response.redirect('/movies/display/'+movie._id);
    })
    .catch((error) => {
      response.render('movies/edit', {movie: movie});
    });
  }

  deleteMovie(request, response) {
    Movie.deleteOne({_id: request.params.id})
    .then(() => {
      response.redirect('/movies');
    })
    .catch((error) => {
      response.render('error', {
        message: error.message,
        error: error
      });
    })
  }
}

let movieObject = new MovieController();

router.get('/', movieObject.listMovies);
router.get('/add', movieObject.addMovie);
router.post('/save', movieObject.saveMovie);
router.get('/display/:id', movieObject.displayMovie);
router.get('/edit/:id', movieObject.editMovie);
router.post('/update/:id', movieObject.updateMovie);
router.post('/delete/:id', movieObject.deleteMovie);

module.exports = movieObject;
module.exports = router;
