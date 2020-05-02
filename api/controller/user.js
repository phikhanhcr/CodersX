var Book = require('../../models/book.model');
var User = require('../../models/user.model');
var Transaction = require('../../models/trasaction.model');
module.exports.index = async (req, res) => {
  var user = await User.find()
  res.json(user);
}

module.exports.book = async (req, res) => {
  var book = await Book.find()
  res.json(book);
}

module.exports.transaction = async (req, res) => {
  var transaction = await Transaction.find()
  res.json(transaction);
}

module.exports.edit = (req, res) => {
  var id = req.params.id;
  User.findByIdAndUpdate(id, req.body, { new: true })
    .then(user => {
      res.json({
        confirmation: 'success',
        data: user
      })
    }).catch(err => {
      res.json({
        confirmation: 'fail',
        message: err.message
      })
    })
}

module.exports.put = (req, res) => {
  User.replaceOne({_id : req.params.id}, req.body)
    .then(user => {
      res.json({
        confirmation: 'success',
        data: user
      })
    }).catch(err => {
      res.json({
        confirmation: 'fail',
        message: err.message
      })
    })
}

module.exports.remove = (req, res) => {
  User.findByIdAndRemove(req.params.id)
    .then(user => {
      res.json({
        confirmation: 'success',
        data: user
      })
    }).catch(err => {
      res.json({
        confirmation: 'fail',
        message: err.message
      })
    })
}

module.exports.postLogin = async (req, res) => {
  var user = await User.find({ email: req.body.email })
  if (user.length == 0) {
    res.json({
      confirmation: 'fail',
      data: `Account doesn't not exsit!`
    })
  } else {
    if ('123' !== req.body.pass) {
      res.json({
        confirmation: 'fail',
        data: 'Wrong Password !!'
      })
      return;
    }
    res.json({
      confirmation: 'Success',
      data: user
    })
  }
}