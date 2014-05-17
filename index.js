var express = require('express');
var app = express();
var mysql = require('mysql');
app.set('port', (process.env.PORT || 8080))
app.use(express.static(__dirname + '/public'))


var connection = mysql.createPool({
	host:'localhost',
	user:'root',
	password:'bitnami',
	database: "test"
});

app.get('/', function(request, response) {

 	response.render('index.html');
})

app.get('/test', function(request, response) {
	var sql = "SELECT * FROM visits";
	connection.getConnection(function(err, connection) {
		var result;
		if(err){
			console.error("Connection error: ", err);
			response.statusCode = 503;
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
					res.send(rows);
					return;
				} else {
					console.log(rows);

					res.send(rows);
				});
app.listen(app.get('port'), function() {
  console.log("Node app is running at localhost:" + app.get('port'))
})
