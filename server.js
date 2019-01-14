var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var session = require('express-session');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var passport = require('passport');
const nodemailer = require('nodemailer');

require('./public/javascripts/Models/userModel');
require('./public/javascripts/Models/floodModel');
require('./public/javascripts/Models/servicesModel');
require('./public/javascripts/Models/dataModel');
require('./public/javascripts/config/passport');
require('./public/javascripts/config/nodemailer');
require('./public/javascripts/Controllers/authentication');
require('./public/javascripts/Controllers/profile');
require('./public/javascripts/Controllers/getData');
require('./public/javascripts/Controllers/sendEmail');
var index = require('./routes/index');

var app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');


app.use(favicon(path.join(__dirname, 'public/images', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser());
app.use(bodyParser.json({limit:'5mb'}));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(express.static(path.join(__dirname,'/', './angular/dist')));

app.use(session({ 
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: false,
  cookie: { secure: true }
 }));

app.use(passport.initialize());
app.use(passport.session());

app.use('/', index);

app.get('*',function(req, res, next){
  res.sendFile(path.join(__dirname, './angular/dist/index.html'));
});


app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});


app.use(function (req, res, next) {
  var err= new Error('Unauthorized Error');
    err.status(401);
    next(err);
});


app.use(function(err, req, res, next) {

  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;