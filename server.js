// server.js
// where your node app starts

// we've started you off with Express (https://expressjs.com/)
// but feel free to use whatever libraries or frameworks you'd like through `package.json`.
const express = require("express");
const app = express();
var pug = require('pug');
var bodyParser = require('body-parser')
var db = require('./db.js');
var removeAccents = require('./removeAccents.js');
var shortId = require('shortid');
// our default array of dreams
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
 
// parse application/json
app.use(bodyParser.json())
app.set('view engine', 'pug')
app.set('views', './views');

const dreams = [
  "Find and count some sheep",
  "Climb a really tall mountain",
  "Wash the dishes"
];

// make all the files in 'public' available
// https://expressjs.com/en/starter/static-files.html
app.use(express.static("public"));

// https://expressjs.com/en/starter/basic-routing.html
app.get("/", (request, response) => {
  response.sendFile(__dirname + "/views/index.html");
});

// send the default array of dreams to the webpage
app.get("/dreams", (request, response) => {
  // express helps us take JS objects and send them as JSON
  response.json(dreams);
});

app.get('/books' , (req, res) => {
  var books = db.get('books').value();
  res.render('book' , {
    "books" : books
  })
})

app.get('/books/create' , (req, res) => {
  res.render('create');
}) 
app.post('/books/create' ,  (req, res) => {
  var title = req.body.title;
  var desc = req.body.desc;
  var id = shortId.generate();
  var value = {
    title : title ,
    desc : desc,
    id : id
  }
  db.get('books').push(value).write();
  res.redirect('/books');
})

app.get('/books/search' , (req, res ) => {
  var search = req.query.search;
  var list = db.get('books').value().filter(ele => {
    return removeAccents(ele.title).toLowerCase().indexOf(removeAccents(search).toLowerCase()) !== -1;
  })
  res.render('book' , {
    'books' : list
  })
})

app.get('/books/:id' , (req, res) => {
  var id = req.params.id;
  db.get('books')
    .remove({id : id})
    .write();
  res.redirect('/books');
})


app.get('/books/edit/:id' , (req, res) => {
  res.render('edit');
})
app.post('/books/edit/:id' , (req, res) => {
  var id = req.params.id ;
  var value = req.body.edit;
  db.get('books')
    .find({id : id})
    .assign({title : value})
    .value();
  res.redirect('/books');
})

app.get('/users', (req, res) => {
  var user = db.get('users').value();
  res.render('user' , {
    "users" : user
  })
})
app.get('/users/create' , (req, res) => {
  res.render('createUser');
})
app.post('/users/create' , (req, res) => {
  var name = req.body.name;
  var sdt = req.body.sdt;
  var id = shortId.generate();
  var value = {
    name : name , 
    sdt : sdt, 
    id : id
  }
  db.get('users').push(value).write();
  res.redirect('/users');
})

app.get('/users/search' , (req, res) => {
  var search = req.query.search;
  var list = db.get('users').value().filter(ele => {
    return removeAccents(ele.name).toLowerCase().indexOf(removeAccents(search).toLowerCase()) !== -1 ;
  })
  res.render('user' , {
    "users" : list
  })
})

app.get('/users/:id' , (req, res) => {
  var id = req.params.id;
  db.get('users')
    .remove({ id : id})
    .write();
  res.redirect('/users');
})
app.get('/users/edit/:id' , (req, res) => {
  res.render()
})

app.post('/users/edit/:id' , (req, res) => {
  var id = req.params.id;
  db.ge
})




// listen for requests :)
const listener = app.listen(process.env.PORT, () => {
  console.log("Your app is listening on port " + listener.address().port);
});
