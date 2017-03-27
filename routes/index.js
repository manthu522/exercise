module.exports = function(app) {

	//contact routes
	var contact = require('./contact');
	app.post('/contact', contact);
	app.get('/contact', contact);
	app.put('/contact', contact);
	app.delete('/contact/:contact_id', contact);
};
