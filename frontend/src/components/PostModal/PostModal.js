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

const defaultState = {
  id: '',
  author: '',
  title: '',
  category: '',
  body: '',
};

class PostModal extends Component {
  static propTypes = {
    isOpen: PropTypes.bool,
    categories: PropTypes.arrayOf(PropTypes.object).isRequired,
    fixedCategory: PropTypes.string,
    actions: PropTypes.shape({
      addPost: PropTypes.func.isRequired,
      editPost: PropTypes.func.isRequired,
    }).isRequired,
    onClose: PropTypes.func.isRequired,
    post: PropTypes.shape({
      id: PropTypes.string,
      author: PropTypes.string,
      title: PropTypes.string,
      category: PropTypes.string,
      body: PropTypes.string,
    }),
    isEdit: PropTypes.bool,
  };

  static defaultProps = {
    isOpen: false,
    fixedCategory: '',
    post: { ...defaultState },
    isEdit: false,
  };

  state = { ...defaultState };

  componentWillReceiveProps(nextProps) {
    const { fixedCategory, categories, post } = nextProps;

    this.setState({ category: fixedCategory || categories[0].name });

    if (post.id) {
      this.setState({ ...post });
    } else {
      this.setState({ id: uuidv4() });
    }
  }

  handleClose = () => {
    this.setState({ ...defaultState });
    this.props.onClose();
  };

  handleSubmit() {
    const { isEdit, actions } = this.props;

    if (isEdit) {
      actions.editPost(this.state);
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
    const { author, title, category, body } = this.state;

    return (
      <Modal show={isOpen} onHide={this.handleClose} restoreFocus={false}>
        <form
          onSubmit={event => {
            event.preventDefault();
            this.handleSubmit();
            this.handleClose();
          }}>
          <Modal.Header closeButton>
            <Modal.Title>{isEdit ? 'Edit' : 'Add new'} post</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {!isEdit && (
              <FormGroup>
                <ControlLabel>Author</ControlLabel>
                <FormControl
                  type="text"
                  placeholder="Enter post author's name"
                  name="author"
                  value={author}
                  onChange={this.handleFormControlChange}
                />
              </FormGroup>
            )}
            <FormGroup>
              <ControlLabel>Title</ControlLabel>
              <FormControl
                type="text"
                placeholder="Enter post's title"
                name="title"
                value={title}
                onChange={this.handleFormControlChange}
              />
            </FormGroup>
            {!fixedCategory &&
            !isEdit && (
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
                placeholder="Enter post's body"
                name="body"
                value={body}
                onChange={this.handleFormControlChange}
              />
            </FormGroup>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.handleClose}>Close</Button>
            <Button bsStyle="primary" type="submit">
              {isEdit ? 'Edit' : 'Add'} post
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
    actions: bindActionCreators({ addPost, editPost }, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(PostModal);
