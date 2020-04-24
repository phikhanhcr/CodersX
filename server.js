// server.js
// where your node app starts

// we've started you off with Express (https://expressjs.com/)
// but feel free to use whatever libraries or frameworks you'd like through `package.json`.
const express = require("express");
const app = express();
var pug = require("pug");
var bodyParser = require("body-parser");
var cookieParser = require('cookie-parser');

var bookRouter = require('./route.book.js');
var userRouter = require('./route.user.js');
var transactionRouter = require('./route.transaction.js');
var loginRouter = require('./router.login');
var checkCookie = require('./validation/checkCookie');
// our default array of dreams
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());
app.set("view engine", "pug");
app.set("views", "./views");
app.use(cookieParser());

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


app.use('/books', checkCookie.checkCookie, bookRouter);
app.use('/users', checkCookie.checkCookie, userRouter);
app.use('/transaction', checkCookie.checkCookie, transactionRouter);
app.use('/login', loginRouter);
app.use(express.static('public'));
// listen for requests :)
app.listen(3000, () => {
  console.log("Your app is listening on port " + 3000);
});
