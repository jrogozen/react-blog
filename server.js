var express = require('express');
var app = express();
var _ = require('underscore');
var Utils = require('./app/server/data-utils');
var Q = require('q');

app.set('js', app.get('env') === 'development' ? 'dev' : 'min');

app.use(function(req, res, next) {
  if(req.url === '/scripts/bundle.js') {
    req.url = '/scripts/bundle.' + app.get('js') + '.js';
  }
  next();
});

app.use('/api/posts', function(req, res, next) {
  Utils.getPosts()
    .then(function(data) {
      res.posts = data;
      next();
    });
});

app.use(/\/api\/posts\/\S+/, function(req, res, next) {
});

app.get('/api/posts', function(req, res) {
  res.json(res.posts);
});

app.get('/api/posts/:slug', function(req, res) {

});

app.use(express.static('./public'));

var port = process.env.PORT || 8080;

app.listen(port);

console.log('Running on port ' + port);