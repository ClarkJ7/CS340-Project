var express = require('express');
var mysql = require('./dbcon.js');
var router = express.Router();
var bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({extended:true}));

router.all('/*', function (req, res, next) {
    req.app.locals.layout = 'view_layout';
    next();
    });

router.get('/', function (req, res) {
  res.render('blank');
});

router.post('/manageMovie', function (req, res) {
	if (!req.body.movieID) {
		var movieID = null
	} else {
		var movieID = req.body.movieID
	};

	if (!req.body.movieTitle) {
		var movieTitle = null
	} else {
		var movieTitle = req.body.movieTitle
	};

	if (!req.body.movieFranchise) {
		var movieFranchise = null
	} else {
		var movieFranchise = req.body.movieFranchise
	};

	if (!req.body.movieGenre) {
		var movieGenre = null
	} else {
		var movieGenre = req.body.movieGenre
	};

	if (!req.body.movieBudget) {
		var movieBudget = null
	} else {
		var movieBudget = req.body.movieBudget
	};

	if (!req.body.movieRevenue) {
		var movieRevenue = null
	} else {
		var movieRevenue = req.body.movieRevenue
	};

	if (!req.body.movieDirector) {
		var movieDirector = null
	} else {
		var movieDirector = req.body.movieDirector
	};

	if (!req.body.movieStudio) {
		var movieStudio = null
	} else {
		var movieStudio = req.body.movieStudio
	};

	if (req.body.iMovie) {
		if (movieID == null || movieTitle == null) {
			console.log("Missing required input, not inserted")
			return;
		}
		context = {};
		var sql = "INSERT INTO movies (movie_id, movie_title, franchise, genre, budget, revenue, director, studio_name) VALUES (?, ?, ?, ?, ?, ?, ?, ?);SELECT * FROM movies";
    	mysql.pool.query(sql, [movieID, movieTitle, movieFranchise, movieGenre, movieBudget, movieRevenue, movieDirector, movieStudio], function(err, rows, fields) {
			if(err){
      			console.log(err);
      		return;
    		}
    		console.log("Movie " + movieTitle + " was added")
    		context.movies = rows[1];
    		res.render('view_movies', context);
    		return;
    })};

    if (req.body.uMovie) {
    	if (movieID == null) {
			console.log("Missing required input, not updated")
			return;
		}
		context = {};
		var sql = "UPDATE movies SET movie_title = ?, franchise = ?, genre = ?, budget = ?, revenue = ?, director = ?, studio_name = ? WHERE movie_id = ?;SELECT * FROM movies";
    	mysql.pool.query(sql, [movieTitle, movieFranchise, movieGenre, movieBudget, movieRevenue, movieDirector, movieStudio, movieID], function(err, rows, fields) {
			if(err){
      			console.log(err);
      		return;
    		}
    		console.log("Movie " + movieTitle + " was updated")
    		context.movies = rows[1];
    		res.render('view_movies', context);
    		return;
    })};
  	
	if (req.body.dMovie) {
		if (movieID == null) {
			console.log("Missing required input, not deleted")
			return;
		}
		context = {};
		var sql = "DELETE FROM movies WHERE movie_id = ?;SELECT * FROM movies";
    	mysql.pool.query(sql, [movieID], function(err, rows, fields) {
			if(err){
      			console.log(err);
      		return;
    		}
    		console.log("Movie " + movieTitle + " was deleted")
    		context.movies = rows[1];
    		res.render('view_movies', context);
    		return
	})};
});

router.post('/manageCharacter', function (req, res) {
	if (!req.body.charName) {
		var charName = null
	} else {
		var charName = req.body.charName
	};

	if (!req.body.charVillain) {
		var charVillain = 0
	} else {
		var charVillain = 1
	};

	if (!req.body.charDate) {
		var charDate = null 
	} else {  
		var charDate = req.body.charDate
	};

	if (req.body.iChar) {
		if (charName == null || charDate == null) {
			console.log("Missing required input, not updated")
			return;
		}
		context = {};
		var sql = "INSERT INTO characters (character_name, is_villain, creation_date) VALUES (?, ?, ?);SELECT * FROM characters";
    	mysql.pool.query(sql, [charName, charVillain, charDate], function(err, rows, fields) {
			if(err){
      			console.log(err);
      		return;
    		}
    		console.log("Character " + charName + " was added")
    		context.characters = rows[1];
    		res.render('view_characters', context);
    		return;
    })};

    if (req.body.uChar) {
    	if (charName == null || charDate == null) {
			console.log("Missing required input, not updated")
			return;
		}
		context = {};
		var sql = "UPDATE characters SET is_villain = ?, creation_date = ? WHERE character_name = ?;SELECT * FROM characters";
    	mysql.pool.query(sql, [charVillain, charDate, charName], function(err, rows, fields) {
			if(err){
      			console.log(err);
      		return;
    		}
    		console.log("Character " + charName + " was updated")
    		context.characters = rows[1];
    		res.render('view_characters', context);
    		return;
    })};
  	
	if (req.body.dChar) {
		if (charName == null) {
			console.log("Missing required input, not updated")
			return;
		}
		context = {};
		var sql = "DELETE FROM characters WHERE character_name = ?;SELECT * FROM characters";
    	mysql.pool.query(sql, [charName], function(err, rows, fields) {
			if(err){
      			console.log(err);
      		return;
    		}
    		console.log("Character " + charName + " was deleted")
    		context.characters = rows[1];
    		res.render('view_characters', context);
    		return;
    })};
});

router.post('/manageActor', function (req, res) {
	if (!req.body.actorName) {
		var actorName = null 
	} else {
		var actorName = req.body.actorName
	};

	if (!req.body.actorGender) {
		var actorGender = null
	} else {
		var actorGender = req.body.actorGender
	};

	if (!req.body.actorNation) {
		var actorNation = null 
	} else {
		var actorNation = req.body.actorNation
	};

	if (!req.body.actorDOB) {
		var actorDOB = null
	} else {
		var actorDOB = req.body.actorDOB
	};

	if (!req.body.actorRoles) {
		var actorRoles = null
	} else {
		var actorRoles = req.body.actorRoles
	};


	if (req.body.iActor) {
		if (actorName == null || actorNation == null || actorDOB == null || actorGender == null || actorRoles == null) {
			console.log("Missing required input, not inserted")
			return;
		}
		context = {};
		var sql = "INSERT INTO actors (actor_name, gender, nationality, dob, credited_roles) VALUES (?, ?, ?, ?, ?);SELECT * FROM actors";
    	mysql.pool.query(sql, [actorName, actorGender, actorNation, actorDOB, actorRoles], function(err, rows, fields) {
			if(err){
      			console.log(err);
      		return;
    		}
    		console.log("Actor " + actorName + " was added")
    		context.actors = rows[1];
    		res.render('view_actors', context);
    		return;
    })};

    if (req.body.uActor) {
    	if (actorName == null || actorNation == null || actorDOB == null || actorGender == null || actorRoles == null) {
			console.log("Missing required input, not updated")
			return;
		}
		context = {};
		var sql = "UPDATE actors SET gender = ?, nationality = ?, dob = ?, credited_roles = ? WHERE actor_name = ?;SELECT * FROM actors";
    	mysql.pool.query(sql, [actorGender, actorNation, actorDOB, actorRoles, actorName], function(err, rows, fields) {
			if(err){
      			console.log(err);
      		return;
    		}
    		console.log("Actor " + actorName + " was updated")
    		context.actors = rows[1];
    		res.render('view_actors', context);
    		return;
    })};
  	
	if (req.body.dActor) {
		if (actorName == null) {
			console.log("Missing required input, not deleted")
			return;
		}
		context = {};
		var sql = "DELETE FROM actors WHERE actor_name = ?;SELECT * FROM actors";
    	mysql.pool.query(sql, [actorName], function(err, rows, fields) {
			if(err){
      			console.log(err);
      		return;
    		}
    		console.log("Actor " + actorName + " was deleted")
    		context.actors = rows[1];
    		res.render('view_actors', context);
    		return;
    })};
});

router.post('/manageRoles', function (req, res) {
	if (!req.body.roleMovie) {
		var roleMovie = null 
	} else {
		var roleMovie = req.body.roleMovie
	};

	if (!req.body.roleActor) {
		var roleActor = null
	} else {
		var roleActor = req.body.roleActor
	};

	if (!req.body.roleChar) {
		var roleChar = null
	} else {
		var roleChar = req.body.roleChar
	};

	if (!req.body.roleMain) {
		var roleMain = 0
	} else {
		var roleMain = 1
	};


	if (req.body.iRole) {
		if (roleMovie == null || roleChar == null) {
			console.log("Missing required input, not inserted")
			return;
		}
		context = {};
		var sql = "INSERT INTO roles (movie_id, actor_name, character_name, main_role) VALUES (?, ?, ?, ?);SELECT * FROM roles";
    	mysql.pool.query(sql, [roleMovie, roleActor, roleChar, roleMain], function(err, rows, fields) {
			if(err){
      			console.log(err);
      		return;
    		}
    		console.log("Role was added")
    		context.roles = rows[1];
    		res.render('view_roles', context);
    		return;
    })};

    if (req.body.uRole) {
    	if (roleMovie == null || roleChar == null) {
			console.log("Missing required input, not updated")
			return;
		}
		context = {};
		var sql = "UPDATE roles SET actor_name = ?, main_role = ? WHERE movie_id = ? AND character_name = ?;SELECT * FROM roles";
    	mysql.pool.query(sql, [roleActor, roleMain, roleMovie, roleChar], function(err, rows, fields) {
			if(err){
      			console.log(err);
      		return;
    		}
    		console.log("Role was updated")
    		context.roles = rows[1];
    		res.render('view_roles', context);
    		return;
    })};
  	
	if (req.body.dRole) {
		if (roleMovie == null || roleChar == null) {
			console.log("Missing required input, not deleted")
			return;
		}
		context = {};
		var sql = "DELETE FROM roles WHERE movie_id = ? AND character_name = ?;SELECT * FROM roles";
    	mysql.pool.query(sql, [roleMovie, roleChar], function(err, rows, fields) {
			if(err){
      			console.log(err);
      		return;
    		}
    		console.log("Role was deleted")
    		context.roles = rows[1];
    		res.render('view_roles', context);
    		return;
    })};
});

router.post('/manageStudios', function (req, res) {
	if (!req.body.studioName) {
		var studioName = null
	} else {
		var studioName = req.body.studioName
	};

	if (!req.body.studioHQ) {
		var studioHQ = null
	} else {
		var studioHQ = req.body.studioHQ
	};

	if (!req.body.studioDate) {
		var studioDate = null
	} else {
		var studioDate = req.body.studioDate
	};

	if (req.body.iStudio) {
		if (studioName == null || studioHQ == null || studioDate == null) {
			console.log("Missing required input, not inserted")
			return;
		}
		context = {};
		var sql = "INSERT INTO studios (name, hq_location, founding_date) VALUES (?, ?, ?);SELECT * FROM studios";
    	mysql.pool.query(sql, [studioName, studioHQ, studioDate], function(err, rows, fields) {
			if(err){
      			console.log(err);
      		return;
    		}
    		console.log("Studio was added")
    		context.studios = rows[1];
    		res.render('view_studios', context);
    		return;
    })};

    if (req.body.uStudio) {
    	if (studioName == null || studioHQ == null || studioDate == null) {
			console.log("Missing required input, not updated")
			return;
		}
		context = {};
		var sql = "UPDATE studios SET hq_location = ?, founding_date = ? WHERE name = ?;SELECT * FROM studios";
    	mysql.pool.query(sql, [studioHQ, studioDate, studioName], function(err, rows, fields) {
			if(err){
      			console.log(err);
      		return;
    		}
    		console.log("Studio was updated")
    		context.studios = rows[1];
    		res.render('view_studios', context);
    		return;
    })};
  	
	if (req.body.dStudio) {
		if (studioName == null) {
			console.log("Missing required input, not deleted")
			return;
		}
		context = {};
		var sql = "DELETE FROM studios WHERE name = ?;SELECT * FROM studios";
    	mysql.pool.query(sql, [studioName], function(err, rows, fields) {
			if(err){
      			console.log(err);
      		return;
    		}
    		console.log("Studio was deleted")
    		context.studios = rows[1];
    		res.render('view_studios', context);
    		return;
    })};
});

router.post('/manageScores', function (req, res) {
	if (!req.body.scoreID) {
		var scoreID = null
	} else {
		var scoreID = req.body.scoreID
	};

	if (!req.body.scoreIMDB) {
		var studioHQ = null
	} else {
		var scoreIMDB = req.body.scoreIMDB
	};

	if (!req.body.scoreRTC) {
		var scoreRTC = null
	} else {
		var scoreRTC = req.body.scoreRTC
	};

	if (!req.body.scoreRTA) {
		var scoreRTA = null 
	} else {
		var scoreRTA = req.body.scoreRTA
	};

	if (req.body.iScore) {
		if (scoreID == null) {
			console.log("Missing required input, not inserted")
			return;
		}
		context = {};
		var sql = "INSERT INTO scores (movie_id, imdb, rt_critic, rt_audience) VALUES (?, ?, ?, ?);SELECT * FROM scores";
    	mysql.pool.query(sql, [scoreID, scoreIMDB, scoreRTC, scoreRTA], function(err, rows, fields) {
			if(err){
      			console.log(err);
      		return;
    		}
    		console.log("Score was added")
    		context.scores = rows[1];
    		res.render('view_scores', context);
    		return;
    })};

    if (req.body.uScore) {
    	if (scoreID == null) {
			console.log("Missing required input, not updated")
			return;
		}
		context = {};
		var sql = "UPDATE scores SET imdb = ?, rt_critic = ?, rt_audience = ? WHERE movie_id = ?;SELECT * FROM scores";
    	mysql.pool.query(sql, [scoreIMDB, scoreRTC, scoreRTA, scoreID], function(err, rows, fields) {
			if(err){
      			console.log(err);
      		return;
    		}
    		console.log("Score was updated")
    		context.scores = rows[1];
    		res.render('view_scores', context);
    		return;
    })};
  	
	if (req.body.dScore) {
		if (scoreID == null) {
			console.log("Missing required input, not deleted")
			return;
		}
		context = {};
		var sql = "DELETE FROM scores WHERE movie_id = ?;SELECT * FROM scores";
    	mysql.pool.query(sql, [scoreID], function(err, rows, fields) {
			if(err){
      			console.log(err);
      		return;
    		}
    		console.log("Score was deleted")
    		context.scores = rows[1];
    		res.render('view_scores', context);
    		return;
    })};
});

module.exports = router;