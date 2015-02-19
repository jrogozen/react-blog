/** @jsx React.DOM */
var React = require('../../vendor/react/react');
var config = require('../server/config.js');

ConnectBar = React.createClass({
  render: function() {
    return (
      <ul className="connect-bar">
        <li><a href={config.connect.github} target="_blank">github</a></li>
        <li><a href={config.connect.twitter} target="_blank">twitter</a></li>
        <li><a href={config.connect.portfolio} target="_blank">portfolio</a></li>
      </ul>
    )
  }
});

module.exports = ConnectBar