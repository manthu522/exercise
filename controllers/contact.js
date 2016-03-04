var Contact = require("../models/contact.js"),
    logger = require('../utility/logger');


/**
 * Create Contact
 * 
 */
this.createContact = function(req, res, next){

  insertValidate(req, next, function() {

    logger.info('Controller: executing createContact() ');

    var contact = new Contact(req.body);

    Contact.create(req.body, function (err, contact) {
      if (err){
        console.log("Error : ",err);
        next(err);
      }else{
        res.send({
            'status' : 'success',
            'message' : 'Contact created successfully ',
            'contact' : contact
        });
      }
    });
  });
};

this.updateContact = function(req, res, next){

  logger.info('Controller: executing updateContact() ');

  //var contact = new Contact(req.body);
    Contact.findByIdAndUpdate(req.body.contact_id, req.body, function(err, contact) {
      if (err){
        console.log("Error : ",err);
        next(err);
      }else{
        res.send({
            'status' : 'success',
            'message' : 'Contact updated successfully ',
            'data' : contact
        });
      }
    });
};


this.listContacts = function(req, res, next){
  Contact.find(function(error, contacts) {
    if(error){
      console.log("Error : ",error);
      next(error);
    }else{
      
      logger.info("contact list :: ",contacts);

      if((contacts != null) && (contacts.length > 0)){
        res.send({
            'status' : 'success',
            'data' : contacts
        });
      }else{
          res.send({
              'status' : 'success',
              'message' : 'No Contact List Found',
              'data' : []
          });
      }

    }
  });
};


var insertValidate = function(req, callbackError, callbackOK) {
  var self = this;
  var index = 0;
  var callbacks = [];
  var errors = {};
  var response = {};
  var obj = {};

  if (typeof req.body.contact_id !== 'undefined') {
    obj._id = req.body.contact_id;
  }
  // Check user_email
  callbacks.push(function() {
        obj.email = req.body.email;

        logger.info("obj ::", obj)
        Contact.find(obj, function(error, email_result){
            if (error) {
              callbackError(error);
            }

            if (typeof email_result[0] !== "undefined") {
              errors.user_email = "Email '" + req.body.email + "' is used.";
            }
            callbacks[++index]();
        });
  });

  // Check user_contact
  callbacks.push(function() {
    obj.home_phone = req.body.home_phone;
    Contact.find(obj, function(error, contact_result){
        if (error) {
          callbackError(error);
        }

        if (typeof contact_result[0] !== "undefined") {
          errors.user_contact = "Mobile '" + self.home_phone + "' is used.";
        }
        callbacks[++index]();
    });
  });

  // Check user_contact
  callbacks.push(function() {
    obj.land_phone = req.body.land_phone;
    Contact.find(obj, function(error, land_phone){
        if (error) {
          callbackError(error);
        }

        if (typeof land_phone[0] !== "undefined") {
          errors.user_contact = "Mobile '" + self.land_phone + "' is used.";
        }
        callbacks[++index]();
    });
  });

  // Check if have errors
  callbacks.push(function() {
    if (Object.keys(errors).length === 0) {
      callbackOK();
    } else {
      response.status = "error";
      response.message = "Some of the details were already in use.";
      response.errors = errors;
      callbackError(response);
    }
  });

  callbacks[index]();
};
