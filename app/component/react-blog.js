/** @jsx React.DOM */
var React = require('../../vendor/react/react');

var ReactBlog = React.createClass({
  render: function() {
    return (
      <div className="layout">
        <div className="layout__sidebar">
          Sidebar
        </div>
        <div className="layout__content">
          Content
        </div>
      </div>
    )
  }
});

module.exports = ReactBlog;