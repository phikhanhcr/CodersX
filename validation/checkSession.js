var shortId = require('shortid');
var db = require('../db');

module.exports = (req, res, next) => {
  if (!req.signedCookies.sessionId) {
    var id = shortId.generate();
    res.cookie('sessionId', id, {
      signed: true
    })
    db.get('session').push({
      id: id
    }).write();
  }
  next();
}