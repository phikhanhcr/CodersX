var shortId = require('shortid');
var db = require('../db');
var Session = require('../models/session.model');
module.exports = async (req, res, next) => {
  if (!req.signedCookies.sessionId) {
    var id = shortId.generate();
    res.cookie('sessionId', id, {
      signed: true
    })
    // db.get('session').push({
    //   id: id
    // }).write();
    await Session.insertMany({_id : id});
  }
  next();
}