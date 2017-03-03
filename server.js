
var logger = require('morgan');
var express = require('express');
var app = express();
var bodyParser=require('body-parser');
var path = require('path');
var cookieParser = require('cookie-parser');//auth
var expressValidator = require('express-validator');//auth
var flash = require('connect-flash');//auth
var session = require('express-session');//auth
var passport = require('passport');//auth
var localStrategy = require('passport-local').Strategy;


var User = require('./models/user.js');

//Database
var mongo = require('mongodb');
var mongoose = require('mongoose');
var dbHost = 'mongodb://localhost:27017/test';
mongoose.connect(dbHost);

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function(){
  console.log("Connected to DB");
});

var routes = require('./routes/movie-crud');
var routesCity = require('./routes/city-crud');
var routesTheater = require('./routes/theater-crud');
var routesShow = require('./routes/showtime-crud');
var routesMapping = require('./routes/mapping-crud');
var routesBooking = require('./routes/moviebooking-crud');
var routesRating = require('./routes/rating-crud');
var routesConfirm = require('./routes/confirm-crud');
var routesauth =  require('./routes/auth');


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(require('express-session')({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(path.join(__dirname, 'public')));

// configure passport
passport.use(new localStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


// app.use(express.static(__dirname + '/public'));
// app.use(bodyParser.json());

app.use('/movie', routes);
app.use('/cty', routesCity);
app.use('/theater', routesTheater);
app.use('/showt', routesShow);
app.use('/map', routesMapping);
app.use('/book', routesBooking);
app.use('/rt', routesRating);
app.use('/con', routesConfirm);
app.use('/user/', routesauth);


app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, '../client', 'index.html'));
});


if (app.get('env') === 'development') {
  var webpackMiddleware = require("webpack-dev-middleware");
  var webpack = require('webpack');

  var config = require('./webpack.config');

  app.use(webpackMiddleware(webpack(config), {
    publicPath: "/build",

    headers: { "X-Custom-Webpack-Header": "yes" },

    stats: {
      colors: true
    }
  }));

}
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

app.use(function(err, req, res) {
  res.status(err.status || 500);
  res.end(JSON.stringify({
    message: err.message,
    error: {}
  }));
});

var server = app.listen(8000, function () {
  console.log('listening on port 8000');
});
