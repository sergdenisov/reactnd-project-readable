import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Grid, Jumbotron, ListGroup, ListGroupItem } from 'react-bootstrap';
import { fetchPosts } from '../actions/posts';

class Posts extends Component {
  componentDidMount() {
    this.props.loadPosts();
  }

  render() {
    const { posts } = this.props;

    if (!posts) {
      return null;
    }

    return (
      <Jumbotron>
        <Grid>
          <h2>Posts</h2>
          <ListGroup>
            {posts.map(post => (
              <ListGroupItem key={post.id} href={`/${post.id}`}>
                {post.title}
              </ListGroupItem>
            ))}
          </ListGroup>
        </Grid>
      </Jumbotron>
    );
  }
}

function mapStateToProps({ posts }) {
  return { posts };
}

function mapDispatchToProps(dispatch) {
  return {
    loadPosts: () => dispatch(fetchPosts()),
  };
}

Posts.propTypes = {
  posts: PropTypes.arrayOf(PropTypes.object).isRequired,
  loadPosts: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Posts);
