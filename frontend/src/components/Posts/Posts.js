import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
  Grid,
  Jumbotron,
  ListGroup,
  ListGroupItem,
  ButtonToolbar,
  DropdownButton,
  MenuItem,
  Button,
  Glyphicon,
} from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { votePost } from '../../actions/posts';
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
    const { posts, category, actions, categories } = this.props;
    const { sortBy, isModalOpen } = this.state;
    const filteredItems = posts.filter(
      item => !category || item.category === category,
    );
    const sortedItems = filteredItems.sort(
      sortOptions.getCompareFunction(sortBy),
    );
    const voteScoreToString = voteScore => {
      if (voteScore > 0) {
        return `+${voteScore}`;
      }

      return voteScore;
    };

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
                className="post"
                header={
                  <LinkContainer to={`/post/${post.id}`}>
                    <a className="post__link">
                      <h3 className="post__header">{post.title}</h3>
                    </a>
                  </LinkContainer>
                }
                key={post.id}>
                <span className="post__details">
                  <span className="post__author">{post.author}</span>
                  <span className="post__additional">
                    <span className="post__toolbar btn-toolbar">
                      <span className="btn-group">
                        <Button
                          bsSize="xsmall"
                          onClick={() => {
                            actions.votePost({
                              id: post.id,
                              option: 'downVote',
                            });
                          }}>
                          <Glyphicon glyph="minus" />
                        </Button>
                        <Button
                          className="post__vote-score"
                          bsStyle="primary"
                          bsSize="xsmall"
                          disabled>
                          {voteScoreToString(post.voteScore)}
                        </Button>
                        <Button bsSize="xsmall">
                          <Glyphicon
                            glyph="plus"
                            onClick={() => {
                              actions.votePost({
                                id: post.id,
                                option: 'upVote',
                              });
                            }}
                          />
                        </Button>
                      </span>
                      <LinkContainer
                        to={`/categories/${categories.find(
                          item => item.name === post.category,
                        ).path}`}>
                        <Button
                          bsSize="xsmall"
                          bsStyle="info"
                          onClick={event => event.target.blur()}>
                          <Glyphicon glyph="tag" /> {post.category}
                        </Button>
                      </LinkContainer>
                    </span>
                    <span className="post__date">
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

function mapStateToProps({ posts, categories }) {
  return { posts, categories };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({ votePost }, dispatch),
  };
}

Posts.propTypes = {
  category: PropTypes.string,
  posts: PropTypes.arrayOf(PropTypes.object).isRequired,
  categories: PropTypes.arrayOf(PropTypes.object).isRequired,
  actions: PropTypes.shape({
    votePost: PropTypes.func.isRequired,
  }).isRequired,
};

Posts.defaultProps = {
  category: '',
};

export default connect(mapStateToProps, mapDispatchToProps)(Posts);
