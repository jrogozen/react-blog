/** @jsx React.DOM */
var React = require('../../vendor/react/react');
var ConnectBar = require('./connect-bar');
var $ = require('jquery-browserify');

var ReactBlog = React.createClass({
  getInitialState: function() {
    return {
      posts: [],
    };
  },
  componentDidMount: function() {
    $.get(this.props.url, function(data) {
      if (this.isMounted()) {
        this.setState({
          posts: data,
          post: data[0]
        });
      }
    }.bind(this));
  },
  focusPost: function(slug) {
    $.get('/api/posts/' + slug, function(data) {
      this.setState({
        post: data
      })
    }.bind(this));
  },
  render: function() {
    return (
      <div className="layout row">
        <div className="layout-sidebar col-sm-12 col-md-3">
          <h1 className="no-margin">ReactBlog</h1>
          <PostList handleTitleClick={this.focusPost} posts={this.state.posts}/>
        </div>
        <div className="layout-content col-sm-12 col-md-9">
          <ConnectBar />
          <PostViewer post={this.state.post}/>
        </div>
      </div>
    )
  }
});

var PostList = React.createClass({
  handleTitleClick: function(slug) {
    this.props.handleTitleClick(slug);
  },
  render: function() {
    var posts = this.props.posts;

    var postSnippets = posts.map(function(post, i) {
      return <PostSnippet data={post} key={i} handleTitleClick={this.handleTitleClick}/>;
    }, this);

    return (
      <div className="posts-list">
        <h3>Latest Blog Posts</h3>
        <ul>
          {postSnippets}
        </ul>
      </div>
    )
  }
});

var PostSnippet = React.createClass({
  handleTitleClick: function(slug) {
    this.props.handleTitleClick(slug);
  },
  render: function() {
    var post = this.props.data;
    return (
      <li>
        <h1 onClick={this.handleTitleClick.bind(this, post.slug)}>{post.title}</h1>
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
      var post = this.props.post;
      return (
        <div>
          <div dangerouslySetInnerHTML={{__html: post.content}} />
        </div>
      )
    }
    return (
      <div/>
    )
  }
});

module.exports = ReactBlog;