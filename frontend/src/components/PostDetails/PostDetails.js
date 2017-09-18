import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Button, Glyphicon } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { votePost } from '../../actions/posts';
import './PostDetails.css';

const voteScoreToString = voteScore => {
  if (voteScore > 0) {
    return `+${voteScore}`;
  }

  return voteScore;
};

const timestampToDate = timestamp => {
  const date = new Date(timestamp);
  return date.toLocaleString();
};

const PostDetails = props => {
  const { post, actions, categoryPath } = props;

  return (
    <span className="post-item-details">
      <span className="post-item-details__author">{post.author}</span>
      <span className="post-item-details__additional">
        <span className="post-item-details__toolbar btn-toolbar">
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
              className="post-item-details__vote-score"
              bsStyle="primary"
              bsSize="xsmall"
              disabled>
              {voteScoreToString(post.voteScore)}
            </Button>
            <Button
              bsSize="xsmall"
              onClick={() => {
                actions.votePost({
                  id: post.id,
                  option: 'upVote',
                });
              }}>
              <Glyphicon glyph="plus" />
            </Button>
          </span>
          {!post.parentId && (
            <LinkContainer to={`/${categoryPath}`}>
              <Button
                bsSize="xsmall"
                bsStyle="info"
                onClick={event => event.target.blur()}>
                <Glyphicon glyph="tag" /> {post.category}
              </Button>
            </LinkContainer>
          )}
          {!post.parentId && (
            <LinkContainer
              to={`/${categoryPath}/${post.id}`}
              activeClassName={''}>
              <Button bsSize="xsmall">
                <Glyphicon glyph="comment" /> {post.comments.length}
              </Button>
            </LinkContainer>
          )}
        </span>
        <span className="post-item-details__date">
          {timestampToDate(post.timestamp)}
        </span>
      </span>
    </span>
  );
};

PostDetails.propTypes = {
  post: PropTypes.shape({
    id: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
    voteScore: PropTypes.number.isRequired,
    timestamp: PropTypes.number.isRequired,
    comments: PropTypes.array,
  }).isRequired,
  actions: PropTypes.shape({
    votePost: PropTypes.func.isRequired,
  }).isRequired,
  categoryPath: PropTypes.string.isRequired,
};

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({ votePost }, dispatch),
  };
}

export default connect(null, mapDispatchToProps)(PostDetails);
