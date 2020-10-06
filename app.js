var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var http = require("http").Server(app);
// const Speakeasy = require("speakeasy");
const dataBase = require('mysql');

// const middleware = require('./utils/middleware');
// logger = require("morgan")

// let io = require('socket.io')(http);
//set view engin part
var app = express();



// app.use(logger('dev'))
// app.set('view engine', 'ejs');
// app.set('/puf', path.join(__dirname, 'views'));
// io.set('origins', 'http://localhost:4200'); 

// var routes = require('./routes/routes')(io)

//body parser for json
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS,PATCH");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept,Authorization");
  // res.header("Access-Control-Allow-Origin", "http://localhost:4200");
  res.header('Access-Control-Allow-Credentials', true);
  next();
});
app.use('/web', express.static('public'));
app.use(bodyParser.json());

app.use('/', express.static(__dirname + '/public'));
app.get('/web/payment', (req, res) => {

  res.redirect('/web/payment.html')
});
app.get('/privacypolicy', (req, res) => {

  res.redirect('/privacy_policy.html')
});

// app.use('/api', require('./routes/index.routes'));
app.use('/images', express.static(__dirname + '/images'));

// app.use('/api', require('./routes/index.routes'));

var routes = require('./routes/user.routes'); //importing route
var routes_1 = require('./routes/academic_info.routes'); //importing route
routes(app);
routes_1(app);



var port = process.env.PORT || 3000
app.listen(port, function () {
  console.log('Server running on port: %d', port);

});

module.exports = app;

