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
import { postPost } from '../../actions/posts';

const defaultState = {
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
      postPost: PropTypes.func.isRequired,
    }).isRequired,
    onClose: PropTypes.func.isRequired,
  };

  static defaultProps = {
    isOpen: false,
    fixedCategory: '',
  };

  state = { ...defaultState };

  componentWillReceiveProps(nextProps) {
    const { fixedCategory, categories } = nextProps;

    this.setState({ category: fixedCategory || categories[0].name });
  }

  handleClose = () => {
    this.setState({ ...defaultState });
    this.props.onClose();
  };

  handleFormControlChange = event => {
    const { name, value } = event.target;

    this.setState({ [name]: value });
  };

  render() {
    const { isOpen, actions, categories, fixedCategory } = this.props;
    const { author, title, category, body } = this.state;

    return (
      <Modal show={isOpen} onHide={this.handleClose} restoreFocus={false}>
        <form
          onSubmit={event => {
            event.preventDefault();
            actions.postPost(this.state);
            this.handleClose();
          }}>
          <Modal.Header closeButton>
            <Modal.Title>Add new post</Modal.Title>
          </Modal.Header>
          <Modal.Body>
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
            {!fixedCategory && (
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
              Add post
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
    actions: bindActionCreators({ postPost }, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(PostModal);
