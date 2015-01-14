var repo = require('./repo');
var http = require('http');

var viewMapping = {};

var endpoint = {};
var app = {};

var successResp = {"statusCode": "S1000","statusDetail": "Success"};

module.exports = {		
				
		configure : function(configure) {
			endpoint = configure.endpoint;
			app = configure.app;
		},
		
		setMapping : function(mapping) {
			viewMapping = mapping;
		},		
		respond: function(req, res){
			var body = req.body;
			var output = resolve(body);
			res.json(successResp);
						
			var response = {
				"applicationId": app.applicationId,
				"password": app.password,
				"message":  output.message, 
				"sessionId": body.sessionId,
				"ussdOperation": output.end ? "mt-fin" : "mt-cont",
				"destinationAddress":  body.sourceAddress
				}
						
			request = http.request(endpoint, function(res) {
				console.log(res);
			});
			request.write(JSON.stringify(response));			
			request.end();
		}
};

var resolve = function(req) {
	if(req.ussdOperation === "mo-init") {
		//repo.remove({msisdn : req.sourceAddress})
		var defaultView = 'index'
			
		var session = {_id : req.sessionId, msisdn : req.sourceAddress, view : defaultView, context : {}};
		
		var output = viewMapping[defaultView].message(req, session)		
		repo.save(session);
		
		return output;
	} else {
		var sessions = repo.find({_id : req.sessionId});
		var session = sessions[0];
		if(session === undefined) {
			return {message : "Ussd session timeout", end : true};
		} else {
			 viewMapping[session.view].handle(req, session);
			 repo.update(session);
			 var output = viewMapping[session.view].message(req, session)			
			
			return output;
		}
	}			
};
