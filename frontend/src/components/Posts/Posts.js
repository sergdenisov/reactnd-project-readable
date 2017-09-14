import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
  Grid,
  Jumbotron,
  ListGroup,
  ListGroupItem,
  Label,
  DropdownButton,
  MenuItem,
} from 'react-bootstrap';
import * as sortOptions from '../../utils/sortOptions';
import timestampToDate from '../../utils/timestampToDate';
import { loadPosts, sortPostsBy } from '../../actions/posts';
import './Posts.css';

class Posts extends Component {
  componentDidMount() {
    this.props.actions.loadPosts();
  }

  render() {
    const { posts, actions } = this.props;
    const { items, sortBy } = posts;
    const sortedItems = items.sort(sortOptions.getCompareFunction(sortBy));

    return (
      <Jumbotron>
        <Grid>
          <div className="posts">
            <h2>Posts</h2>
            <div className="posts__sort">
              <DropdownButton
                title={`Sorted by: ${sortOptions.getTitle(sortBy)}`}
                onSelect={(eventKey, event) => {
                  actions.sortPostsBy(eventKey);
                  event.target.blur();
                }}
                id="posts-sort">
                {sortOptions.getAll().map(([key, value]) => (
                  <MenuItem eventKey={key} active={key === sortBy} key={key}>
                    {value}
                  </MenuItem>
                ))}
              </DropdownButton>
            </div>
          </div>
          <ListGroup>
            {sortedItems.map(post => (
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
  return { actions: bindActionCreators({ loadPosts, sortPostsBy }, dispatch) };
}

Posts.propTypes = {
  posts: PropTypes.PropTypes.shape({
    items: PropTypes.arrayOf(PropTypes.object).isRequired,
    sortBy: PropTypes.oneOf(sortOptions.getAll().map(([key]) => key)),
  }).isRequired,
  actions: PropTypes.PropTypes.shape({
    loadPosts: PropTypes.func.isRequired,
    sortPostsBy: PropTypes.func.isRequired,
  }).isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Posts);
