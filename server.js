var express = require('express');
var app = express();
var _ = require('underscore');
var Utils = require('./app/server/data-utils');

app.set('js', app.get('env') === 'development' ? 'dev' : 'min');

app.use(function(req, res, next) {
  if(req.url === '/scripts/bundle.js') {
    req.url = '/scripts/bundle.' + app.get('js') + '.js';
  }
  next();
});

app.use('/api/posts', function(req, res, next) {
  Utils.getAllPosts()
    .then(function(data) {
      res.posts = data;
      next();
    });
});

app.use(/\/api\/posts\/\S+/, function(req, res, next) {
  var slug = req.baseUrl.replace('/api/posts/', '');

  Utils.getPost(slug)
    .then(function(data) {
      res.post = data;
      next();
    });
});

app.get('/api/posts/:year/:month/:day/:title', function(req, res) {
  res.json(res.post);
});

app.get('/api/posts', function(req, res) {
  res.json(res.posts);
});

app.use(express.static('./public'));
app.use(express.static('./vendor'));

var port = process.env.PORT || 8080;

app.listen(port);

console.log('Running on port ' + port);