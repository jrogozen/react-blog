var fs = require('fs');
var marked = require('marked');
var Q = require('q');

function titleize(fileName) {
  return fileName.replace(/_/gi, '/').substring(0, fileName.length - 3);
}

function titleToFilename(title) {
  title.replace(/\//gi, '_').concat('.md');
}

exports.getPosts = function() {
  var posts = [],
    dir = __dirname + '/../data',
    deferred = Q.defer();

  fs.readdir(dir, function(err, files) {
    if (err) throw err;

    var i = 0;

    files.forEach(function(file) {
      i++;

      fs.readFile(dir + '/' + file, 'utf-8', function(err, fileData) {
        if (err) throw err;

        var post = {};

        post.slug = titleize(file);
        post.content = marked(fileData);

        posts.push(post);

        if (0 === --i) {
          deferred.resolve(posts);
        }

      });
    });
  });
  return deferred.promise;
};

