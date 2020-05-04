module.exports.createUser = (req, res, next ) => {
  var errors = [];
  if(!req.body.name) {
    errors.push('Name is required!');
  }
  if(!req.body.sdt) {
    errors.push('Telephone is required!');
  }
  if(req.body.name.length > 25) {
    errors.push('Length must be less than 25!');
  }
  if(errors.length) {
    res.render('createUser' , {
      'errors' : errors,
      'values': req.body
    })
    return;
  }
  next();
}
module.exports.createBook = (req, res, next ) => {
  var errors = [];
  if(!req.body.title) {
    errors.push('Title is required!');
  }
  if(!req.body.desc) {
    errors.push('Description is required!');
  }
  if(errors.length) {
    res.render('create' , {
      'errors' : errors,
      'values': req.body
    })
    return;
  }
  next();
}


