var express = require('express');
var mysql = require('./dbcon.js');
var router = express.Router();
var bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({extended:true}));

router.all('/*', function (req, res, next) {
    req.app.locals.layout = 'manage_layout';
    next();
    });

router.get('/', function (req, res) {
  res.render('blank');
});

router.post('/manageMovie', function (req, res) {
	if (!req.body.movieID) {
		console.log("No movie, role not added")
		return; 
	} else {
		var movieID = req.body.movieID
	};

	if (!req.body.movieTitle) {
		console.log("No title, movie not added")
		return; 
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
		var sql = "INSERT INTO movies (movie_id, movie_title, franchise, genre, budget, revenue, director, studio_name) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
    	mysql.pool.query(sql, [movieID, movieTitle, movieFranchise, movieGenre, movieBudget, movieRevenue, movieDirector, movieStudio], function(err, rows, fields) {
			if(err){
      			next(err);
      		return;
    		}
    		console.log("Movie " + movieTitle + " was added")
    		return;
    })};

    if (req.body.uMovie) {
		var sql = "UPDATE movies SET movie_title, franchise, genre, budget, revenue, director, studio_name WHERE movie_id = ?";
    	mysql.pool.query(sql, [ movieTitle, movieFranchise, movieGenre, movieBudget, movieRevenue, movieDirector, movieStudio, movieID], function(err, rows, fields) {
			if(err){
      			next(err);
      		return;
    		}
    		console.log("Movie " + movieTitle + " was updated")
    })};
  	
	if (req.body.dMovie) {
		var sql = "DELETE FROM movies WHERE movie_id = ?";
    	mysql.pool.query(sql, [movieID], function(err, rows, fields) {
			if(err){
      			next(err);
      		return;
    		}
    		console.log("Movie " + movieTitle + " was deleted")
	})};
});

router.post('/manageCharacter', function (req, res) {
	if (!req.body.charName) {
		console.log("No name, character not added")
		return; 
	} else {
		var charName = req.body.charName
	};

	if (!req.body.charVillain) {
		var charVillain = 0
	} else {
		var charVillain = 1
	};

	if (!req.body.charDate) {
		console.log("No date, character not added")
		return; 
	} else {
		var charDate = req.body.charDate
	};

	if (req.body.iChar) {
		var sql = "INSERT INTO characters (character_name, is_villain, creation_date) VALUES (?, ?, ?)";
    	mysql.pool.query(sql, [charName, charVillain, charDate], function(err, rows, fields) {
			if(err){
      			next(err);
      		return;
    		}
    		console.log("Character " + charName + " was added")
    		return;
    })};

    if (req.body.uChar) {
		var sql = "UPDATE characters SET is_villain = ?, creation_date = ? WHERE character_name = ?";
    	mysql.pool.query(sql, [charVillain, charDate, charName], function(err, rows, fields) {
			if(err){
      			next(err);
      		return;
    		}
    		console.log("Character " + charName + " was updated")
    })};
  	
	if (req.body.dChar) {
		var sql = "DELETE FROM characters WHERE character_name = ?";
    	mysql.pool.query(sql, [charName], function(err, rows, fields) {
			if(err){
      			next(err);
      		return;
    		}
    		console.log("Character " + charName + " was deleted")
    })};
});

router.post('/manageActor', function (req, res) {
	if (!req.body.actorName) {
		console.log("No name, actor not added")
		return; 
	} else {
		var actorName = req.body.actorName
	};

	if (!req.body.actorGender) {
		console.log("No gender, actor not added")
		return; 
	} else {
		var actorGender = req.body.actorGender
	};

	if (!req.body.actorNation) {
		console.log("No nationality, actor not added")
		return; 
	} else {
		var actorNation = req.body.actorNation
	};

	if (!req.body.actorDOB) {
		console.log("No dob, actor not added")
		return; 
	} else {
		var actorDOB = req.body.actorDOB
	};

	if (!req.body.actorRoles) {
		console.log("No roles, actor not added")
		return; 
	} else {
		var actorRoles = req.body.actorRoles
	};


	if (req.body.iActor) {
		var sql = "INSERT INTO actors (actor_name, gender, nationality, dob, credited_roles) VALUES (?, ?, ?, ?, ?)";
    	mysql.pool.query(sql, [actorName, actorGender, actorNation, actorDOB, actorRoles], function(err, rows, fields) {
			if(err){
      			next(err);
      		return;
    		}
    		console.log("Actor " + actorName + " was added")
    		return;
    })};

    if (req.body.uActor) {
		var sql = "UPDATE actors SET gender = ?, nationality = ?, dob = ?, credited_roles = ? WHERE actor_name = ?";
    	mysql.pool.query(sql, [actorGender, actorNation, actorDOB, actorRoles, actorName], function(err, rows, fields) {
			if(err){
      			next(err);
      		return;
    		}
    		console.log("Actor " + actorName + " was updated")
    })};
  	
	if (req.body.dActor) {
		var sql = "DELETE FROM actors WHERE actor_name = ?";
    	mysql.pool.query(sql, [actorName], function(err, rows, fields) {
			if(err){
      			next(err);
      		return;
    		}
    		console.log("Actor " + actorName + " was deleted")
    })};
});

router.post('/manageRoles', function (req, res) {
	if (!req.body.roleMovie) {
		console.log("No movie, role not added")
		return; 
	} else {
		var roleMovie = req.body.roleMovie
	};

	if (!req.body.roleActor) {
		var roleActor = null
	} else {
		var roleActor = req.body.roleActor
	};

	if (!req.body.roleChar) {
		console.log("No character, role not added")
		return; 
	} else {
		var roleChar = req.body.roleChar
	};

	if (!req.body.roleMain) {
		var roleMain = 0
	} else {
		var roleMain = 1
	};


	if (req.body.iRole) {
		var sql = "INSERT INTO roles (movie_id, actor_name, character_name, main_role) VALUES (?, ?, ?, ?)";
    	mysql.pool.query(sql, [roleMovie, roleActor, roleChar, roleMain], function(err, rows, fields) {
			if(err){
      			next(err);
      		return;
    		}
    		console.log("Role was added")
    		return;
    })};

    if (req.body.uRole) {
		var sql = "UPDATE roles SET actor_name, main_role WHERE movie_id = ? AND character_name = ?";
    	mysql.pool.query(sql, [roleActor, roleMain, roleMovie, roleChar], function(err, rows, fields) {
			if(err){
      			next(err);
      		return;
    		}
    		console.log("Role was updated")
    })};
  	
	if (req.body.dRole) {
		var sql = "DELETE FROM roles WHERE movie_id = ? AND character_name = ?";
    	mysql.pool.query(sql, [roleMovie, roleChar], function(err, rows, fields) {
			if(err){
      			next(err);
      		return;
    		}
    		console.log(roleChar + "'s role from " + roleMovie + " was deleted")
    })};
});

router.post('/manageStudios', function (req, res) {
	if (!req.body.studioName) {
		console.log("No name, studio not added")
		return; 
	} else {
		var studioName = req.body.studioName
	};

	if (!req.body.studioHQ) {
		var studioHQ = null
	} else {
		var studioHQ = req.body.studioHQ
	};

	if (!req.body.studioDate) {
		console.log("No date, studio not added")
		return; 
	} else {
		var studioDate = req.body.studioDate
	};

	if (req.body.iStudio) {
		var sql = "INSERT INTO studios (name, hq_location, founding_date) VALUES (?, ?, ?)";
    	mysql.pool.query(sql, [studioName, studioHQ, studioDate], function(err, rows, fields) {
			if(err){
      			next(err);
      		return;
    		}
    		console.log("Studio was added")
    		return;
    })};

    if (req.body.uStudio) {
		var sql = "UPDATE studios SET hq_location, founding_date WHERE name = ?";
    	mysql.pool.query(sql, [roleActor, roleMain, roleMovie, roleChar], function(err, rows, fields) {
			if(err){
      			next(err);
      		return;
    		}
    		console.log("Studio was updated")
    })};
  	
	if (req.body.dStudio) {
		var sql = "DELETE FROM studios WHERE name = ?";
    	mysql.pool.query(sql, [studioName], function(err, rows, fields) {
			if(err){
      			next(err);
      		return;
    		}
    		console.log("Studio was deleted")
    })};
});

router.post('/manageScores', function (req, res) {
	if (!req.body.scoreID) {
		console.log("No ID, score not added")
		return; 
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

	if (req.body.iStudio) {
		var sql = "INSERT INTO scores (movie_id, imdb, rt_critic, rt_audience) VALUES (?, ?, ?, ?)";
    	mysql.pool.query(sql, [scoreID, scoreIMDB, scoreRTC, scoreRTA], function(err, rows, fields) {
			if(err){
      			next(err);
      		return;
    		}
    		console.log("Score was added")
    		return;
    })};

    if (req.body.uStudio) {
		var sql = "UPDATE scores SET imdb, rt_critic, rt_audience WHERE movie_id = ?";
    	mysql.pool.query(sql, [scoreIMDB, scoreRTC, scoreRTA, scoreID], function(err, rows, fields) {
			if(err){
      			next(err);
      		return;
    		}
    		console.log("Score was updated")
    })};
  	
	if (req.body.dStudio) {
		var sql = "DELETE FROM scores WHERE movie_id = ?";
    	mysql.pool.query(sql, [scoreID], function(err, rows, fields) {
			if(err){
      			next(err);
      		return;
    		}
    		console.log("Score was deleted")
    })};
});

module.exports = router;