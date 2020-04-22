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
app.post('/books/create')
// listen for requests :)
const listener = app.listen(process.env.PORT, () => {
  console.log("Your app is listening on port " + listener.address().port);
});
