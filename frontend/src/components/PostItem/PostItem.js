import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
  ListGroupItem,
  Button,
  Glyphicon,
  ButtonToolbar,
} from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { votePost, deletePost } from '../../actions/posts';
import timestampToDate from '../../utils/timestampToDate';
import './PostItem.css';

class PostItem extends Component {
  static propTypes = {
    post: PropTypes.shape({
      id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      author: PropTypes.string.isRequired,
      voteScore: PropTypes.number.isRequired,
      timestamp: PropTypes.number.isRequired,
      comments: PropTypes.array.isRequired,
    }).isRequired,
    categories: PropTypes.arrayOf(PropTypes.object).isRequired,
    actions: PropTypes.shape({
      votePost: PropTypes.func.isRequired,
      deletePost: PropTypes.func.isRequired,
    }).isRequired,
  };

  static defaultProps = {
    category: '',
  };

  static voteScoreToString(voteScore) {
    if (voteScore > 0) {
      return `+${voteScore}`;
    }

    return voteScore;
  }

  handleDeleteButtonClick() {
    const { actions, post } = this.props;

    if (window.confirm('Are you sure you want to do this post?')) {
      actions.deletePost(post.id);
    }
  }

  render() {
    const { post, actions, categories } = this.props;
    const category = categories.find(item => item.name === post.category);
    const categoryPath = category ? category.path : '';

    return (
      <ListGroupItem
        className="post-item"
        header={
          <div>
            <LinkContainer to={`/${categoryPath}/${post.id}`}>
              <a className="post-item__link">
                <h3 className="post-item__header">{post.title}</h3>
              </a>
            </LinkContainer>
            <ButtonToolbar className="post-item__main">
              <Button bsSize="xsmall" bsStyle="warning">
                Edit
              </Button>
              <Button
                bsSize="xsmall"
                bsStyle="danger"
                onClick={() => this.handleDeleteButtonClick()}>
                Delete
              </Button>
            </ButtonToolbar>
          </div>
        }>
        <span className="post-item__details">
          <span className="post-item__author">{post.author}</span>
          <span className="post-item__additional">
            <span className="post-item__toolbar btn-toolbar">
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
                  className="post-item__vote-score"
                  bsStyle="primary"
                  bsSize="xsmall"
                  disabled>
                  {PostItem.voteScoreToString(post.voteScore)}
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
              <LinkContainer to={`/${categoryPath}`}>
                <Button
                  bsSize="xsmall"
                  bsStyle="info"
                  onClick={event => event.target.blur()}>
                  <Glyphicon glyph="tag" /> {post.category}
                </Button>
              </LinkContainer>
              <LinkContainer to={`/${categoryPath}/${post.id}`}>
                <Button bsSize="xsmall">
                  <Glyphicon glyph="comment" /> {post.comments.length}
                </Button>
              </LinkContainer>
            </span>
            <span className="post-item__date">
              {timestampToDate(post.timestamp)}
            </span>
          </span>
        </span>
      </ListGroupItem>
    );
  }
}

function mapStateToProps({ posts, categories }) {
  return { posts, categories };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({ votePost, deletePost }, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(PostItem);
