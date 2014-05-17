var express = require('express');
var app = express();

app.set('port', (process.env.PORT || 8080))
app.use(express.static(__dirname + '/public'))

app.get('/', function(request, response) {
 	response.render('index.html');
})

app.get('/api/test', function(request, response) {
	response.send("You passed!");
})

app.listen(app.get('port'), function() {
  console.log("Node app is running at localhost:" + app.get('port'))
})
