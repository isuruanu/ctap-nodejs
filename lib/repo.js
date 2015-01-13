var loki = require('lokijs')

var db = new loki('loki.json') 

var sessions = db.addCollection('session')
/*
 * {
 * id : ILKJAD890
 * msisdn : tel:94779090901
 * view : welcome
 * context : {
 * 	name : "Isuru"
 * }
 * }
 *  
 * */

module.exports = {

/* save session */
  save : function(session) {
	  sessions.insert(session);
  },
  
  /*find by session id*/
  find : function(query) {
	  return sessions.find(query);
  },    
  
  remove: function(query) {
	  sessions.remove(query);
  },
  
  update: function(session) {
	  sessions.update(session);
  }
};