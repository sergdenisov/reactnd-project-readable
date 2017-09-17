import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { ListGroupItem, Button, Glyphicon } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { votePost } from '../../actions/posts';
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
    }).isRequired,
    categories: PropTypes.arrayOf(PropTypes.object).isRequired,
    actions: PropTypes.shape({
      votePost: PropTypes.func.isRequired,
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

  render() {
    const { post, actions, categories } = this.props;

    return (
      <ListGroupItem
        className="post-item"
        header={
          <LinkContainer to={`/post/${post.id}`}>
            <a className="post-item__link">
              <h3 className="post-item__header">{post.title}</h3>
            </a>
          </LinkContainer>
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
    actions: bindActionCreators({ votePost }, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(PostItem);
