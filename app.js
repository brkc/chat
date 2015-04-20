'use strict';

var express = require('express');
var path = require('path');
var logger = require('morgan');
var bodyParser = require('body-parser');

var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var db = require('./models');

app.set('view engine', 'jade');
app.use(logger('dev'));
app.use(bodyParser.urlencoded({ extended: false }));

if (app.get('env') === 'development') {
  app.locals.pretty = true;
  app.use(function(req, res, next) {
    db.sequelize.sync().then(function() {
      next();
    });
  });
}

require('./router')(app, io, db);
http.listen(3000);
