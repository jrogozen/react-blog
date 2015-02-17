var express = require('express');
var app = express();

app.set('js', app.get('env') === 'development' ? 'dev' : 'min');

app.use(function(req, res, next) {
  if (req.url === '/scripts/bundle.js') {
    req.url = '/scripts/bundle.' + app.get('js') + '.js';
  }

  next();
})

app.use(express.static('./public'));

var port = process.env.PORT || 8080;

app.listen(port);

console.log('Running on port ' + port);