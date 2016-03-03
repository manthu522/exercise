var Contact = require("../models/contact.js"),
    logger = require('../utility/logger');


/**
 * Create Contact
 * 
 */
this.createContact = function(req, res, next){

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
          'contact' : contact
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
