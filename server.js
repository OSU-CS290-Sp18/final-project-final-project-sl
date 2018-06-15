/*
 * Write your routing code in this file.  Make sure to add your name and
 * @oregonstate.edu email address below.
 *
 * Name: Savannah Loberger	
 * Email: loberges@oregonstate.edu
 */

var path = require('path');
var express = require('express');
var exphbs = require('express-handlebars');
var hikeData = require('./hikeData');
var app = express();

var port = process.env.PORT || 4040;

app.engine('handlebars', exphbs({ defaultLayout: 'main'}));
app.set('view engine', 'handlebars');
app.use(express.static('public'));

/* Open Home page - pull hikes from hikeData.json*/
app.get('/', function (req, res, next) {
  res.status(200).render('home', { 
	hikes: hikeData
  });
});

/* Open Home page - pull hikes from hikeData.json*/
app.get('/home', function (req, res, next) {
  res.status(200).render('home', {
	hikes: hikeData
  });
});

/* Open About page */
app.get('/about', function (req, res, next) {
  res.status(200).render('about');
});

/* Open Parks page - pull hikes from hikeData.json*/
app.get('/parks', function (req, res, next) {
  res.status(200).render('parks', {
	hikes: hikeData
  });
});

/* Open Pictures page - pull hikes from hikeData.json*/
app.get('/pictures', function (req, res, next) {
  res.status(200).render('pictures', {
	hikes: hikeData
  });
});

/* Open single hike page - pull hikes from hikeData.json*/
app.get('/hikes/:n', function (req, res, next) {
  var n =  req.params.n;
  if (hikeData[n]){
    res.status(200).render('hikeSingle', hikeData[n]);
  } else {
    next();
  }
});

/* Open Error page on anything else*/
app.get('*', function (req, res) {
  res.status(404).render('404');
});

app.listen(port, function () {
  console.log("== Server is listening on port", port);
});

