var fs = require('fs');
var marked = require('marked');

function titleize(fileName) {
  return fileName.replace(/_/gi, '/').substring(0, fileName.length - 3);
}

function titleToFilename(title) {
  title.replace(/\//gi, '_').concat('.md');
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

        var fileTitle = titleize(file);
        data[fileTitle] = marked(fileData);

        if (0 === --i) {
          console.log(data);
        }
      });
    });
  });
}

exports.getPosts = function() {
  // par();
};

