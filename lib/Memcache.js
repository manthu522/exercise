var memcache = require('memcache'),
	config = require('../config.js'),
/**
 * Memcache singletone class
 */
Memcache = function Memcache() {
	console.log("MEMCACHE CONNECT 1");
	// defining a var instead of this (works for variable & function) will create a private definition
	this.mcClient = new memcache.Client()
	this.mcClient.port = config.memcache.port
	this.mcClient.host = config.memcache.host
	
	console.log("MEMCACHE CONNECT 2");
	this.mcClient.connect();/*function(err) {              			 	
        if(err) {                                    	 	
        	console.log('ERRO WHEN CONNECTING TO MEMCACHE:', err);	
        }else {											  		
            console.log("MEMCACHE CONNECT SUCCESSFUL");	
        }                                                 
	});*/
	
	console.log("MEMCACHE CONNECT 3");
	this.mcClient.on('connect', function(){
	    // no arguments - we've connected
		console.log("MEMCACHE CONNECTED SUCCESSFULLY");
	});
	
	this.mcClient.on('error', function(err) {
        if(err) { 	
        	console.log("MEMCACHE CONNECTION ERROR: " + err); 
        } 
    });
	
	console.log("MEMCACHE CONNECT 4");
	this.mcClient.on('close', function(err) {
        if(err) { 	
        	console.log("MEMCACHE CONNECTION CLOSED."); 
        } 
    });
   
	if (Memcache.caller != Memcache.getInstance) {
		throw new Error("This object cannot be instanciated")
	}
}

Memcache.instance = null;

/**
 * Memcache getInstance definition
 * @return {Memcache} class
 */

Memcache.getInstance = function(){

		if(this.instance === null){
			this.instance = new Memcache()
		}
		return this.instance
}

module.exports = Memcache.getInstance()