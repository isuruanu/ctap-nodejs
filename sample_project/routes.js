var http = require('http'), 
    fs = require('fs');

var ussdSession = require('ctap');

//Configuration
try {
    var configJSON = fs.readFileSync(__dirname + "/config.json");
    var config = JSON.parse(configJSON.toString());
    ussdSession.configure({endpoint : config.ctap.ussd.endpoint, app : config.ctap.ussd.app});
} catch(e) {
    console.error("File config.json not found or is invalid: " + e.message);
    process.exit(1);
}


ussdSession.setMapping({
	'index' : {
		message : function(req, session) {
			return {message : "Welcome to node-ctap !!! \n1. Company Info \n2.Projects"};
		},
		handle : function(req, session) {
			if(req.message === "1") {
				session.view = 'cinfo'
			} else if(req.message ===  "2") {
				session.view = 'project'
			} else {
				session.view = 'invalid'
			}
		}
	},
	'cinfo' : {
		message : function(req, session) {
			return {message : "hSenid mobile solutions, connecting telcos to business"};
		},
		handle : function(req, session) {
			session.view = 'end'
		}
	},
	'project' : {
		message : function(req, session) {
			return {message : "1. TAP \n2. LAP \n3. Siganalling"};
		},
		handle : function(req, session) {
			session.view = 'end'
		}
	},
	'end' : {
		message : function(req, session) {
			return {message : "Bye bye !!!", end : true};
		}
	},
	'invalid' : {
		message : function(req, session) {
			return {message : "Invalid input, bye bye !!!", end : true};
		}
	}
}		
);

var ussd = function (req, res) {
    ussdSession.respond(req, res);
};

module.exports = {
  ussd: ussd
};
