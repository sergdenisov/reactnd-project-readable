import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { ListGroupItem, Button, ButtonToolbar } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { deletePost } from '../../actions/posts';
import PostDetails from '../PostDetails/PostDetails';
import PostModal from '../PostModal/PostModal';
import './PostItem.css';

class PostItem extends Component {
  static propTypes = {
    post: PropTypes.shape({
      id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      category: PropTypes.string.isRequired,
    }).isRequired,
    categories: PropTypes.arrayOf(PropTypes.object).isRequired,
    actions: PropTypes.shape({
      deletePost: PropTypes.func.isRequired,
    }).isRequired,
  };

  state = {
    isEditing: false,
  };

  openModal = () => {
    this.setState({ isEditing: true });
  };

  closeModal = () => {
    this.setState({ isEditing: false });
  };

  handleDeleteButtonClick = () => {
    const { actions, post } = this.props;

    if (window.confirm('Are you sure you want to do this post?')) {
      actions.deletePost(post.id);
    }
  };

  render() {
    const { post, categories } = this.props;
    const category = categories.find(item => item.name === post.category);
    const categoryPath = category ? category.path : '';
    const { isEditing } = this.state;

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
              <Button
                bsSize="xsmall"
                bsStyle="warning"
                onClick={this.openModal}>
                Edit
              </Button>
              <Button
                bsSize="xsmall"
                bsStyle="danger"
                onClick={this.handleDeleteButtonClick}>
                Delete
              </Button>
            </ButtonToolbar>
          </div>
        }>
        <PostDetails post={post} categoryPath={categoryPath} />
        <PostModal
          isOpen={isEditing}
          onClose={this.closeModal}
          isEdit
          post={post}
        />
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
