var fs = require('fs');
var marked = require('marked');

function titleize(fileName) {

}

function parsePosts() {
  var data = {},
    dir = __dirname + '/../data';

  fs.readdir(dir, function(err, files) {
    if (err) throw err;

    var i = 0;

    files.forEach(function(file) {
      i++;

      fs.readFile(dir + '/' + file, 'utf-8', function(err, fileData) {
        if (err) throw err;

        data[file] = marked(fileData);

        if (0 === --i) {
          console.log(data);
        }
      });
    });
  });
}

function parsePost(year, month, day, title) {

}

exports.getPosts = function() {
  // par();
};

