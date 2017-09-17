import React, { Component } from 'react';
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
import './Posts.css';
import PostModal from '../PostModal/PostModal';

class Posts extends Component {
  state = {
    sortBy: sortOptions.getDefault(),
    isModalOpen: false,
  };

  openModal = () => {
    this.setState({ isModalOpen: true });
  };

  closeModal = () => {
    this.setState({ isModalOpen: false });
  };

  render() {
    const { posts, category } = this.props;
    const { sortBy, isModalOpen } = this.state;
    const filteredItems = posts.filter(
      item => !category || item.category === category,
    );
    const sortedItems = filteredItems.sort(
      sortOptions.getCompareFunction(sortBy),
    );

    return (
      <Jumbotron>
        <Grid>
          {category && <h1>Posts by category: {category}</h1>}
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
        <PostModal
          isOpen={isModalOpen}
          onClose={this.closeModal}
          fixedCategory={category}
        />
      </Jumbotron>
    );
  }
}

function mapStateToProps({ posts }) {
  return { posts };
}

Posts.propTypes = {
  category: PropTypes.string,
  posts: PropTypes.arrayOf(PropTypes.object).isRequired,
};

Posts.defaultProps = {
  category: '',
};

export default connect(mapStateToProps)(Posts);
