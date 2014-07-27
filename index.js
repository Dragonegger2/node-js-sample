var express = require('express');
var app = express();
var mysql = require('mysql');
var jade = require('jade');
app.set('view engine', 'jade');
app.set('port', (process.env.PORT || 8080))
app.use(express.static(__dirname + '/public'))

var connection = mysql.createPool({
	host		:	'localhost',
	user		: 	'root',
	password	: 	'secret',
	database 	: 	'lakehost',
	port: 3306
});

app.get('/other', function (req, res) {
	var data =  {
            'title': 'Geolocation'
		};
  	console.log(data);
  res.render("index", data);
});

app.get('/lake', function(request, response) {
	var getLakeDataSql = "select save.Save_ID, species.Name, lake.Name, lake.Latitude, lake.Longitude, save.Entering from save inner join species ON save.Species_ID = species.species_ID inner join lake ON save.Lake_ID = lake.Lake_ID;";
	var results;
	connection.query("use lakehost");
	connection.query(getLakeDataSql, function(err, rows, fields) {
			if (err) {
				response.statusCode = 500;
				results = {
					message: "error"
				}	
				console.log(err);
				response.send(results);
			} else {
				if(rows.length == 0){
					rows = { message: "No user found"};
					response.send(rows);
					return;
				} else {
					console.log(rows);
					response.send(rows);
				}
			}
		}
	)
});

app.get('/test', function(request, response) {
	var sql = "SELECT * FROM visits";
	connection.getConnection(function(err, connection) {
		var result;
		if(err){
			console.error("Connection error: ", err);
			response.statusCode = 503;
			console.log(err);
			result = {
				message: "error"
			}
		}
		else {
			console.log("connection aquired");
			result = {
				message: "connected"
			}

		}
		response.send(result);
	}
)});

app.get('/visits', function(request, response) {
	var results;
	var sql = "SELECT * FROM visits";
	connection.query(sql, function(err, rows, fields) {
			if (err) {
				response.statusCode = 500;
				results = {
					message: "error"
				}	
			} else {
				if(rows.length == 0){
					rows = { message: "No user found"};
					response.send(rows);
					return;
				} else {
					console.log(rows);

					response.send(rows);
				}}})});

app.listen(app.get('port'), function() {
  console.log("Node app is running at localhost:" + app.get('port'))
})
