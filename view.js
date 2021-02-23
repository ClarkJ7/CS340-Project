var express = require('express');
var mysql = require('./dbcon.js');
var router = express.Router();

router.all('/*', function (req, res, next) {
    req.app.locals.layout = 'view_layout'; // set your layout here
    next(); // pass control to the next handler
    });

router.get('/', function (req, res) {
  res.render('blank', {layout: 'view_layout'});
});

router.get('/movies',function(req,res,next){
  var context = {};
  mysql.pool.query('SELECT * FROM movies', function(err, rows, fields){
    if(err){
      next(err);
      return;
    }
    context.movies = rows;
    res.render('view_movies', context);
    });
  });

router.get('/actors',function(req,res,next){
  var context = {};
  mysql.pool.query('SELECT * FROM actors', function(err, rows, fields){
    if(err){
      next(err);
      return;
    }
    context.actors = rows;
    res.render('view_actors', context);
    });
  });

router.get('/characters',function(req,res,next){
  var context = {};
  mysql.pool.query('SELECT * FROM characters', function(err, rows, fields){
    if(err){
      next(err);
      return;
    }
    context.characters = rows;
    res.render('view_characters', context);
    });
  });

router.get('/roles',function(req,res,next){
  var context = {};
  mysql.pool.query('SELECT * FROM roles', function(err, rows, fields){
    if(err){
      next(err);
      return;
    }
    context.roles = rows;
    res.render('view_roles', context);
    });
  });

router.get('/studios',function(req,res,next){
  var context = {};
  mysql.pool.query('SELECT * FROM studios', function(err, rows, fields){
    if(err){
      next(err);
      return;
    }
    context.studios = rows;
    res.render('view_studios', context);
    });
  });

router.get('/scores',function(req,res,next){
  var context = {};
  mysql.pool.query('SELECT * FROM scores', function(err, rows, fields){
    if(err){
      next(err);
      return;
    }
    context.scores = rows;
    res.render('view_scores', context);
    });
  });

module.exports = router;