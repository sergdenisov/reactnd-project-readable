import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
  Button,
  Modal,
  FormGroup,
  FormControl,
  ControlLabel,
} from 'react-bootstrap';
import uuidv4 from 'uuid/v4';
import { addPost, editPost } from '../../actions/posts';
import { getComment, addComment, editComment } from '../../actions/comments';

const defaultPost = {
  id: '',
  author: '',
  title: '',
  category: '',
  body: '',
  parentId: '',
};

class PostModal extends Component {
  static propTypes = {
    isOpen: PropTypes.bool,
    categories: PropTypes.arrayOf(PropTypes.object).isRequired,
    fixedCategory: PropTypes.string,
    actions: PropTypes.shape({
      addPost: PropTypes.func.isRequired,
      editPost: PropTypes.func.isRequired,
      getComment: PropTypes.func.isRequired,
      addComment: PropTypes.func.isRequired,
      editComment: PropTypes.func.isRequired,
    }).isRequired,
    onClose: PropTypes.func.isRequired,
    post: PropTypes.shape({
      id: PropTypes.string,
      author: PropTypes.string,
      title: PropTypes.string,
      category: PropTypes.string,
      body: PropTypes.string,
      parentId: PropTypes.string,
    }),
    isEdit: PropTypes.bool,
  };

  static defaultProps = {
    isOpen: false,
    fixedCategory: '',
    post: { ...defaultPost },
    isEdit: false,
  };

  state = { ...defaultPost };

  componentWillReceiveProps(nextProps) {
    const { fixedCategory, categories, post, actions } = nextProps;

    if (
      post.parentId &&
      nextProps.isOpen &&
      !this.props.isOpen &&
      nextProps.isEdit
    ) {
      actions.getComment(post.id);
      return;
    }

    this.setState({
      category: fixedCategory || (categories.length && categories[0].name),
    });

    if (post.id) {
      this.setState({ ...post });
    } else {
      this.setState({ id: uuidv4(), parentId: post.parentId });
    }
  }

  handleClose = () => {
    this.setState({ ...defaultPost });
    this.props.onClose();
  };

  handleSubmit() {
    const { isEdit, actions, post } = this.props;

    if (isEdit) {
      if (post.parentId) {
        actions.editComment(this.state);
      } else {
        actions.editPost(this.state);
      }
    } else if (post.parentId) {
      actions.addComment(this.state);
    } else {
      actions.addPost(this.state);
    }
  }

  handleFormControlChange = event => {
    const { name, value } = event.target;

    this.setState({ [name]: value });
  };

  render() {
    const { isOpen, categories, fixedCategory, isEdit } = this.props;
    const { author, title, category, body, parentId } = this.state;
    const type = parentId ? 'comment' : 'post';

    return (
      <Modal show={isOpen} onHide={this.handleClose} restoreFocus={false}>
        <form
          onSubmit={event => {
            event.preventDefault();
            this.handleSubmit();
            this.handleClose();
          }}>
          <Modal.Header closeButton>
            <Modal.Title>
              {isEdit ? 'Edit' : 'Add new'} {type}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {!isEdit && (
              <FormGroup>
                <ControlLabel>Author</ControlLabel>
                <FormControl
                  type="text"
                  placeholder={`Enter ${type} author's name`}
                  name="author"
                  value={author}
                  onChange={this.handleFormControlChange}
                />
              </FormGroup>
            )}
            {!parentId && (
              <FormGroup>
                <ControlLabel>Title</ControlLabel>
                <FormControl
                  type="text"
                  placeholder={`Enter ${type}'s title`}
                  name="title"
                  value={title}
                  onChange={this.handleFormControlChange}
                />
              </FormGroup>
            )}
            {!fixedCategory &&
            !isEdit &&
            !parentId && (
              <FormGroup>
                <ControlLabel>Category</ControlLabel>
                <FormControl
                  componentClass="select"
                  name="category"
                  value={category}
                  onChange={this.handleFormControlChange}>
                  {categories.map(item => (
                    <option value={item.name} key={item.name}>
                      {item.name}
                    </option>
                  ))}
                </FormControl>
              </FormGroup>
            )}
            <FormGroup>
              <ControlLabel>Body</ControlLabel>
              <FormControl
                componentClass="textarea"
                placeholder={`Enter ${type}'s body`}
                name="body"
                value={body}
                onChange={this.handleFormControlChange}
              />
            </FormGroup>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.handleClose}>Close</Button>
            <Button bsStyle="primary" type="submit">
              {isEdit ? 'Edit' : 'Add'} {type}
            </Button>
          </Modal.Footer>
        </form>
      </Modal>
    );
  }
}

function mapStateToProps({ categories }) {
  return { categories };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(
      { addPost, editPost, getComment, addComment, editComment },
      dispatch,
    ),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(PostModal);
