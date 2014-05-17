var express = require('express');
var app = express();
var mysql = require('mysql');
app.set('port', (process.env.PORT || 8080))
app.use(express.static(__dirname + '/public'))


var connection = mysql.createPool({
	host:'127.0.0.1',
	user:'root',
	password:'bitnami1',
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

app.listen(app.get('port'), function() {
  console.log("Node app is running at localhost:" + app.get('port'))
})
