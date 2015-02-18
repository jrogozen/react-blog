/** @jsx React.DOM */
var React = require('../../vendor/react/react');
var $ = require('jquery-browserify');

var ReactBlog = React.createClass({
  render: function() {
    return (
      <div className="layout">
        <div className="layout layout-sidebar">
          <PostList url="/api/posts"/>
        </div>
        <div className="layout layout-content">
          Content
        </div>
      </div>
    )
  }
});

var PostList = React.createClass({
  getInitialState: function() {
    return {
      posts: []
    };
  },
  componentDidMount: function() {
    $.get(this.props.url, function(data) {
      if (this.isMounted()) {
        this.setState({
          posts: data
        });
      }
    }.bind(this));
  },
  render: function() {
    var posts = this.state.posts;

    var postSnippets = posts.map(function(post, i) {
      return <PostSnippet data={post} key={i} />;
    }, this);

    return (
      <div className="posts-list">
        {postSnippets}
      </div>
    )
  }
});

var PostSnippet = React.createClass({
  render: function() {
    var post = this.props.data;
    return (
      <div>
        <h1>{post.title}</h1>
        <div dangerouslySetInnerHTML={{__html: post.content}}/>
      </div>
    )
  }
});

module.exports = ReactBlog;