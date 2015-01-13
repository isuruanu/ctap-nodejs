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
				"sessionId": "1330929317043",
				"ussdOperation": output.end ? "mt-fin" : "mt-cont",
				"destinationAddress":  req.sourceAddress
				}
						
			var options = Object.create(config);
			options.body = response;
			http.request(options, function(res) {
				console.log(res)
			})
		}
};

var resolve = function(req) {
	if(req.ussdOperation === "mo-init") {
		repo.remove({msisdn : req.sourceAddress})
		var defaultView = 'index'
			
		var session = {id : req.sessionId, msisdn : req.sourceAddress, view : defaultView, context : {}};
		
		var output = viewMapping[defaultView].message(req, session)		
		repo.save(session);
		
		return output;
	} else {
		var session = repo.find({id : req.sessionId});
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