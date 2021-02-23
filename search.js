var express = require('express');
var mysql = require('./dbcon.js');
var router = express.Router();

router.all('/*', function (req, res, next) {
    req.app.locals.layout = 'search_layout'; // set your layout here
    next(); // pass control to the next handler
    });

router.get('/', function (req, res) {
  res.render('blank');
});

router.get('/movieSearch', function (req, res) {

	console.log("Movie ID: " + req.query.idSearch)
	console.log("Movie Title: " + req.query.titleSearch)
	console.log("Director: " + req.query.directorSearch)

    var movieID = req.query.idSearch;
    context = {};
    //var titleSearch = req.body.titleSearch;
    //var directorSearch = req.body.directorSearch;
    
    var sql = "SELECT * FROM movies WHERE movie_id = ?";

    mysql.pool.query(sql, [movieID], function(err, rows, fields) {
		if(err){
      		next(err);
      	return;
    }
    context.movies = rows;
    res.render('search_movieid', context);
    });
  });

router.get('/actorSearch', function (req, res) {

	console.log("Actor Name: " + req.query.actorSearch)
    var actorName = req.query.actorSearch;

    context = {};
    
    var sql = "SELECT * FROM actors WHERE actor_name = ?";

    mysql.pool.query(sql, [actorName], function(err, rows, fields) {
		if(err){
      		next(err);
      	return;
    }
    context.actors = rows;
    res.render('search_actorname', context);
    });
  });

router.get('/characterSearch', function (req, res) {

	console.log("Character Name: " + req.query.characterSearch)

    var charName = req.query.characterSearch;
    context = {};

    
    var sql = "SELECT * FROM characters WHERE character_name = ?";

    mysql.pool.query(sql, [charName], function(err, rows, fields) {
		if(err){
      		next(err);
      	return;
    }
    context.characters = rows;
    res.render('search_charname', context);
    });
  });

module.exports = router;