import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { ListGroupItem, Button, ButtonToolbar } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import classnames from 'classnames';
import { deletePost } from '../../actions/posts';
import PostDetails from '../PostDetails/PostDetails';
import PostModal from '../PostModal/PostModal';
import './PostItem.css';

class PostItem extends Component {
  static propTypes = {
    post: PropTypes.shape({
      id: PropTypes.string.isRequired,
      body: PropTypes.string.isRequired,
      title: PropTypes.string,
      category: PropTypes.string,
      parentId: PropTypes.string,
    }).isRequired,
    categories: PropTypes.arrayOf(PropTypes.object).isRequired,
    actions: PropTypes.shape({
      deletePost: PropTypes.func.isRequired,
    }).isRequired,
    isSingle: PropTypes.bool,
    onDelete: PropTypes.func,
  };

  static defaultProps = {
    isSingle: false,
    onDelete: null,
  };

  state = {
    isEditing: false,
  };

  getButtons() {
    return (
      <ButtonToolbar
        className={classnames('post-item__main', {
          'post-item__main_single': this.props.isSingle,
        })}>
        <Button bsSize="xsmall" bsStyle="warning" onClick={this.openModal}>
          Edit
        </Button>
        <Button
          bsSize="xsmall"
          bsStyle="danger"
          onClick={this.handleDeleteButtonClick}>
          Delete
        </Button>
      </ButtonToolbar>
    );
  }

  getContent(categoryPath) {
    const { post } = this.props;
    const { isEditing } = this.state;

    return (
      <span className="post-item__content">
        {post.parentId && <span className="post-item__body">{post.body}</span>}
        <PostDetails post={post} categoryPath={categoryPath} />
        <PostModal
          isOpen={isEditing}
          onClose={this.closeModal}
          isEdit
          post={post}
        />
      </span>
    );
  }

  openModal = () => {
    this.setState({ isEditing: true });
  };

  closeModal = () => {
    this.setState({ isEditing: false });
  };

  handleDeleteButtonClick = () => {
    const { actions, post, onDelete } = this.props;

    if (
      window.confirm(
        `Are you sure you want to delete this ${post.parentId
          ? 'comment'
          : 'post'}?`,
      )
    ) {
      actions.deletePost(post.id);
      onDelete && onDelete();
    }
  };

  render() {
    const { post, categories, isSingle } = this.props;
    const category = categories.find(item => item.name === post.category);
    const categoryPath = category ? category.path : '';

    if (isSingle) {
      return (
        <div className="post-item">
          <p>{post.body}</p>
          {this.getButtons()}
          {this.getContent(categoryPath)}
        </div>
      );
    }

    return (
      <ListGroupItem
        className="post-item"
        header={
          post.parentId ? (
            this.getButtons()
          ) : (
            <div>
              <LinkContainer to={`/${categoryPath}/${post.id}`}>
                <a className="post-item__link">
                  <h3 className="post-item__header">{post.title}</h3>
                </a>
              </LinkContainer>
              {this.getButtons()}
            </div>
          )
        }>
        {this.getContent(categoryPath)}
      </ListGroupItem>
    );
  }
}

function mapStateToProps({ categories }) {
  return { categories };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({ deletePost }, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(PostItem);
