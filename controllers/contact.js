var contactModel = require("../models/contact.js"),
    logger = require('../utility/logger');


/**
 * Create Contact
 *
 */
function createContact(req, res, next){

    logger.info('Controller: executing createContact() ');

    var contact = new contactModel(req.body);

    contactModel.save(req.body, function (err, contact) {
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
}

function updateContact(req, res, next){

  logger.info('Controller: executing updateContact() ');

    contactModel.findByIdAndUpdate(req.body.contact_id, req.body, function(err, contact) {
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
}

function listContacts(req, res, next){
    contactModel.find(function(error, contacts) {
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
}

function deleteContact(req, res, next){
    contactModel.remove({ _id: req.params.contact_id }, function(error, result){
      if(error){
        res.send({
            'status' : 'error',
            'message' : 'FAILED TO REMOVE CONTACT'
        });
      }else{
        res.send({
            'status' : 'success',
            'message' : 'CONTACT REMOVED SUCCESSFULLY'
        });
      }
    });
}

module.exports = {
    createContact: createContact,
    updateContact: updateContact,
    listContacts: listContacts,
    deleteContact: deleteContact
};
