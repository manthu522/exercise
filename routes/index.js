module.exports = function(app) {

	//contact routes
	var contact = require('./contact');
	app.post('/contact/create', contact);
	app.get('/contact/select', contact);
	app.put('/contact/update', contact);
};
