var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const connectToMongo = require('./connection/db');
const flash = require('connect-flash');
const session = require('express-session');
const cors = require('cors');
const secretKey = "NodeJS"
const jwt = require('jsonwebtoken');
const port = 1600;


connectToMongo();

var registerRouter = require('./routes/register');
var forgotUser = require('./routes/forget');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var addTask = require('./routes/project')
var add = require('./routes/date')
var book = require('./routes/books')

var app = express();

function verifyToken(req, res, next) {
  const BearerHeader = req.headers['authorization'];

  try {
    if (typeof BearerHeader !== 'undefined') {
      const temp = BearerHeader.split(" ");
      const token = temp[1];

      jwt.verify(token, secretKey, (err) => {
        if (err) {
          return res.status(401).json({ error: "Unauthorized" });
        }
        else {
          next();
        }
      });
    } else {
    }
  } catch (error) {
    console.log(error);
  }
}



// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(cors({
  "origin": "*",
  "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
  "preflightContinue": false,
  "optionsSuccessStatus": 204
}));

app.use(session({
  secret: 'your-secret-key',
  resave: true,
  saveUninitialized: true
}));

// Connect flash
app.use(flash());
app.use('/weekly-reports', express.static(path.join(__dirname, 'WeeklyReports')));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use((req, res, next) => {
  if (req.method === 'POST' && (req.path === '/submit' || req.path === '/register' || req.path === '/forget')) {
    next(); // Skip verification for POST /submit route
  } else {
    verifyToken(req, res, next); // Apply verifyToken middleware for all other routes
  }
});


app.use('/',registerRouter);
app.use('/',forgotUser);
app.use('/', indexRouter);
app.use('/', usersRouter);
app.use('/', addTask);
app.use('/', add);
app.use('/', book);


app.listen(port,() => {
  console.log(`Port is ${port}`)
})

module.exports = app;
