var express = require("express"),
    path = require("path"),
    http = require("http"),
    fs = require('fs'),    
	routes = require('./routes');

var app = express();

//Configuration
try {
    var configJSON = fs.readFileSync(__dirname + "/config.json");
    var config = JSON.parse(configJSON.toString());
} catch(e) {
    console.error("File config.json not found or is invalid: " + e.message);
    process.exit(1);
}

app.configure(function() {	
	app.set('port', config.port || 3000);	
	app.use(express.logger('dev'));	
	app.use(express.bodyParser());	
	app.use(express.cookieParser());				
	app.use(app.router);		
});

app.post('/ussd', routes.ussd);

http.createServer(app).listen(app.get('port'), function(){
	  console.log("Express server listening on port " + app.get('port'));
});
