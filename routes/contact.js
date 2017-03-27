var express = require('express');
var router = express.Router();
var logger = require('../utility/logger');
var contact = require("../controllers/contact");
var validateHelper = require("../utility/ValidateHelper");

/* Create Contact */
router.post('/contact', function(req, res, next) {

	logger.info("Route: /contact/create:");
	logger.info("Parameters : req.body: " , req.body);

	// any validations we can add here.
	req.check("first_name", "Please input first_name").notEmpty();
	req.check("last_name", "Please input last_name").notEmpty();
	req.check("home_phone", "Please input Home Phone").notEmpty();
	req.check("land_phone", "Please input Land Phone").notEmpty();
	req.check("email", "Please input Email").notEmpty();

	req.check("email", 'Email is not correct.').isEmail();

	var errors = validateHelper.makeErrors(req.validationErrors());

	if(Object.keys(errors).length > 0 ){
		var response = {};
		response.status = "error";
		response.message = "Please input "+Object.keys(errors).join(", ");
		response.errors = errors;
		next(response);
		return;
	}

	next();

}, contact.createContact);

/* Update Contact */
router.put('/contact', function(req, res, next) {

	logger.info("Route: /contact/update:");
	logger.info("Parameters : req.body: " , req.body);

	// any validations we can add here.
	req.check("contact_id", "Please input id").notEmpty();
	req.check("first_name", "Please input first_name").notEmpty();
	req.check("last_name", "Please input last_name").notEmpty();
	req.check("home_phone", "Please input Home Phone").notEmpty();
	req.check("land_phone", "Please input Land Phone").notEmpty();
	req.check("email", "Please input Email").notEmpty();

	req.check("email", 'Email is not correct.').isEmail();

	var errors = validateHelper.makeErrors(req.validationErrors());

	if(Object.keys(errors).length > 0 ){
		var response = {};
		response.status = "error";
		response.message = "Please input "+Object.keys(errors).join(", ");
		response.errors = errors;
		next(response);
		return;
	}

	next();

}, contact.updateContact);

router.get('/contact', function(req, res, next) {

	logger.info("Route: /user/select:");
	logger.info("Parameters : req.params: " + JSON.stringify(req.params));

	next();

}, contact.listContacts);

router.delete('/contact/:contact_id', function(req, res, next) {

	logger.info("Route: Delete Contact");
	logger.info("Parameters : req.params: " + JSON.stringify(req.params));

	next();

}, contact.deleteContact);

module.exports = router;
