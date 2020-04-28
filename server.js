// server.js
// where your node app starts
require('dotenv').config();
// we've started you off with Express (https://expressjs.com/)
// but feel free to use whatever libraries or frameworks you'd like through `package.json`.
const express = require("express");
const app = express();
var bodyParser = require("body-parser");
var cookieParser = require('cookie-parser');

var bookRouter = require('./route.book.js');
var userRouter = require('./route.user.js');
var transactionRouter = require('./route.transaction.js');
var loginRouter = require('./router.login');
var checkCookie = require('./validation/checkCookie');
var checkAdmin = require('./middleware/checkAdmin');


// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());
app.set("view engine", "pug");
app.set("views", "./views");
app.use(cookieParser(process.env.SECRET_SIGNED_COOKIES));

//controller.sendEmail();
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


app.use('/books',checkAdmin.checkAdmin, checkCookie.checkCookie, bookRouter);
app.use('/users', checkAdmin.checkAdmin, checkCookie.checkCookie, userRouter);
app.use('/transaction', checkCookie.checkCookie, transactionRouter);
app.use('/login', loginRouter);
app.use(express.static('public'));
// listen for requests :)
app.listen(3001, () => {
  console.log("Your app is listening on port " + 3001);
});
