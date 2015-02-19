/** @jsx React.DOM */
var React = require('../vendor/react/react');
var ReactBlog = require('./component/react-blog');

window.app = (function(scope) {
  return React.renderComponent(<ReactBlog url="/api/posts"/>, document.getElementById('container'));
})();