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
  ButtonToolbar,
  DropdownButton,
  MenuItem,
  Button,
} from 'react-bootstrap';
import * as sortOptions from '../../utils/sortOptions';
import timestampToDate from '../../utils/timestampToDate';
import { getPosts } from '../../actions/posts';
import './Posts.css';
import PostModal from '../PostModal/PostModal';

class Posts extends Component {
  state = {
    sortBy: sortOptions.getDefault(),
    isModalOpen: false,
  };

  componentDidMount() {
    this.props.actions.getPosts();
  }

  openModal = () => {
    this.setState({ isModalOpen: true });
  };

  closeModal = () => {
    this.setState({ isModalOpen: false });
  };

  render() {
    const { posts } = this.props;
    const { sortBy, isModalOpen } = this.state;
    const sortedItems = posts.sort(sortOptions.getCompareFunction(sortBy));

    return (
      <Jumbotron>
        <Grid>
          <div className="posts">
            <h2>Posts</h2>
            <ButtonToolbar className="posts__sort">
              <DropdownButton
                title={
                  <span>
                    Sorted by: <strong>{sortOptions.getTitle(sortBy)}</strong>
                  </span>
                }
                onSelect={(eventKey, event) => {
                  this.setState({ sortBy: eventKey });
                  event.target.blur();
                }}
                id="posts-sort">
                {sortOptions.getAll().map(([key, value]) => (
                  <MenuItem eventKey={key} active={key === sortBy} key={key}>
                    {value}
                  </MenuItem>
                ))}
              </DropdownButton>
              <Button bsStyle="primary" onClick={this.openModal}>
                Add post
              </Button>
            </ButtonToolbar>
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
        <PostModal isOpen={isModalOpen} onClose={this.closeModal} />
      </Jumbotron>
    );
  }
}

function mapStateToProps({ posts }) {
  return { posts };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({ getPosts }, dispatch),
  };
}

Posts.propTypes = {
  posts: PropTypes.PropTypes.arrayOf(PropTypes.object).isRequired,
  actions: PropTypes.PropTypes.shape({
    getPosts: PropTypes.func.isRequired,
  }).isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Posts);
