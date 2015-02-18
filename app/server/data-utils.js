var fs = require('fs');
var marked = require('marked');
var Q = require('q');
var dir = __dirname + '/../data';
var _ = require('underscore');

function filenameToSlug(fileName) {
  return fileName.replace(/_/gi, '/').substring(0, fileName.length - 3);
}

function slugToFilename(slug) {
  return slug.replace(/\//gi, '_').concat('.md');
}

function titleize(slug) {
  var truncated = slug.replace(/\d+|\//g, '');
  return truncated.replace('-', ' ').split(' ').map(function(word) {
    return word.charAt(0).toUpperCase() + word.slice(1);
  }).join(' ');
}

function filenameToDate(fileName) {
  return fileName.replace(/\D+/g, '');
}

exports.getAllPosts = function() {
  var posts = [],
    deferred = Q.defer();

  fs.readdir(dir, function(err, files) {
    if (err) throw err;

    var i = 0;

    files.forEach(function(file) {
      i++;

      fs.readFile(dir + '/' + file, 'utf-8', function(err, fileData) {
        if (err) throw err;

        var post = {};

        post.slug = filenameToSlug(file);
        post.content = marked(fileData);
        post.title = titleize(post.slug);
        post.date = filenameToDate(file);

        posts.push(post);

        if (0 === --i) {
          var sortedPosts = _.sortBy(posts, function(post){ return -post.date });
          deferred.resolve(sortedPosts);
        }

      });
    });
  });
  return deferred.promise;
};

exports.getPost = function(slug) {
  var deferred = Q.defer(),
    fileName = slugToFilename(slug),
    post = {};

  fs.readFile(dir + '/' + fileName, 'utf-8', function(err, fileData) {
    if (err) throw err;

    post.slug = slug;
    post.title = titleize(slug);
    post.content = marked(fileData);
    post.date = filenameToDate(fileName);

    return deferred.resolve(post);
  });

  return deferred.promise;
};