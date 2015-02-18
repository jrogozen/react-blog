/** @jsx React.DOM */
var React = require('../../vendor/react/react');
var $ = require('jquery-browserify');

var ReactBlog = React.createClass({
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
    var latestPost = this.state.posts[0];

    return (
      <div className="layout">
        <div className="layout layout-sidebar">
          <PostList posts={this.state.posts}/>
        </div>
        <div className="layout layout-content">
          <PostViewer post={latestPost}/>
        </div>
      </div>
    )
  }
});

var PostList = React.createClass({
  render: function() {
    var posts = this.props.posts;

    var postSnippets = posts.map(function(post, i) {
      return <PostSnippet data={post} key={i} />;
    }, this);

    return (
      <div className="posts-list">
        <ul>
          {postSnippets}
        </ul>
      </div>
    )
  }
});

var PostSnippet = React.createClass({
  render: function() {
    var post = this.props.data;
    return (
      <li>
        <h1>{post.title}</h1>
      </li>
    )
  }
});

var PostViewer = React.createClass({
  getInitialState: function() {
    return {
      post: this.props.post
    }
  },
  render: function() {
    /* handle check for initial load which doesn't include prop data yet */
    if (this.props.post) {
      return (
        <div>
          {this.props.post.title}
        </div>
      )
    }
    return (
      <div/>
    )
  }
})

module.exports = ReactBlog;