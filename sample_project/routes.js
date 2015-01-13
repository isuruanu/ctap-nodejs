var http = require('http');

var ussdSession = require('../lib/ussd_session');

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