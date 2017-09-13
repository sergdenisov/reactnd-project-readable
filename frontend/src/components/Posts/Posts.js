import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
  Grid,
  Jumbotron,
  ListGroup,
  ListGroupItem,
  Label,
} from 'react-bootstrap';
import timestampToDate from '../../utils/timestampToDate';
import { fetchPosts } from '../../actions/posts';
import './Posts.css';

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
              <ListGroupItem
                key={post.id}
                header={post.title}
                href={`/post/${post.id}`}>
                <span className="post-details">
                  <span className="post-details__author">{post.author}</span>
                  <span className="post-details__additional">
                    <Label bsStyle="primary">{post.voteScore}</Label>{' '}
                    <Label bsStyle="info">{post.category}</Label>
                    <span className="post-details__date">
                      {timestampToDate(post.timestamp)}
                    </span>
                  </span>
                </span>
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
