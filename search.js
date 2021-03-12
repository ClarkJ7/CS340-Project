var express = require('express');
var mysql = require('./dbcon.js');
var router = express.Router();
var bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({extended:true}));

router.all('/*', function (req, res, next) {
    req.app.locals.layout = 'search_layout'; // set your layout here
    next(); // pass control to the next handler
    });

router.get('/', function (req, res) {
  res.render('blank');
});

router.post('/movieSearch', function (req, res) {
	console.log("Title: " + req.body.titleSearch)
	console.log("ID: " + req.body.idSearch)
	console.log("Director: " + req.body.directorSearch)


	if (!req.body.titleSearch) {
		var titleSearch = null
	} else {
		var titleSearch = req.body.titleSearch
	};

	if (!req.body.idSearch) {
		var idSearch = null
	} else {
		var idSearch = req.body.idSearch
	};

	if (!req.body.directorSearch) {
		var directorSearch = null 
	} else {  
		var directorSearch = req.body.directorSearch
	};

	context = {};

	if (req.body.idSubmit) {
		var sql = "SELECT * FROM movies WHERE movie_id =?;SELECT character_name, actor_name FROM roles WHERE movie_id=?";
    	mysql.pool.query(sql, [idSearch, idSearch], function(err, rows, fields) {
			if(err){
      			next(err);
      		return;
    		}
    		context.movies = rows[0];
        context.roles = rows[1];
    		res.render('search_movieid', context);
    })};

    if (req.body.titleSubmit) {
		var sql = "SELECT * FROM movies WHERE movie_title LIKE ?";
    	mysql.pool.query(sql, ['%' + titleSearch + '%'], function(err, rows, fields) {
			if(err){
      			next(err);
      		return;
    		}
    		context.movies = rows;
    		res.render('search_movieid', context);
    })};
  	
	if (req.body.directorSubmit) {
		var sql = "SELECT * FROM movies WHERE director LIKE ?";
    	mysql.pool.query(sql, ['%' + directorSearch + '%'], function(err, rows, fields) {
			if(err){
      			next(err);
      		return;
    		}
    		context.movies = rows;
    		res.render('search_movieid', context);
    })};
});

router.get('/actorSearch', function (req, res) {

	console.log("Actor Name: " + req.query.actorSearch)
    var actorName = req.query.actorSearch;

    context = {};
    
    var sql = "SELECT * FROM actors WHERE actor_name LIKE ?";

    mysql.pool.query(sql, ['%' + actorName + '%'], function(err, rows, fields) {
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

    
    var sql = "SELECT * FROM characters WHERE character_name LIKE ?";

    mysql.pool.query(sql, ['%' + charName + '%'], function(err, rows, fields) {
		if(err){
      		next(err);
      	return;
    }
    context.characters = rows;
    res.render('search_charname', context);
    });
  });

module.exports = router;