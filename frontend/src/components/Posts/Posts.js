import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
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
  Modal,
  FormGroup,
  FormControl,
  ControlLabel,
} from 'react-bootstrap';
import * as sortOptions from '../../utils/sortOptions';
import timestampToDate from '../../utils/timestampToDate';
import { getPosts, sortPostsBy, postPost } from '../../actions/posts';
import './Posts.css';

class Posts extends Component {
  state = {
    isModalOpen: false,
    modalForm: {},
  };

  componentDidMount() {
    this.props.actions.getPosts();
  }

  toggleModal(isShown) {
    this.setState({ isModalOpen: isShown });
  }

  handleFormControlChange = event => {
    const { name, value } = event.target;

    this.setState(prevState => ({
      ...prevState,
      modalForm: {
        ...prevState.modalForm,
        [name]: value,
      },
    }));
  };

  render() {
    const { posts, actions, categories } = this.props;
    const { items, sortBy } = posts;
    const sortedItems = items.sort(sortOptions.getCompareFunction(sortBy));
    const { isModalOpen, modalForm } = this.state;

    return (
      <Jumbotron>
        <Grid>
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
                  actions.sortPostsBy(eventKey);
                  event.target.blur();
                }}
                id="posts-sort">
                {sortOptions.getAll().map(([key, value]) => (
                  <MenuItem eventKey={key} active={key === sortBy} key={key}>
                    {value}
                  </MenuItem>
                ))}
              </DropdownButton>
              <Button bsStyle="primary" onClick={() => this.toggleModal(true)}>
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
          <Modal
            show={isModalOpen}
            onHide={() => this.toggleModal(false)}
            restoreFocus={false}>
            <form
              onSubmit={event => {
                event.preventDefault();
                actions.postPost(modalForm);
                this.toggleModal(false);
              }}>
              <Modal.Header closeButton>
                <Modal.Title>Add a new post</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <FormGroup>
                  <ControlLabel>Author</ControlLabel>
                  <FormControl
                    type="text"
                    placeholder="Enter post author's name"
                    name="author"
                    value={modalForm.author}
                    onChange={this.handleFormControlChange}
                  />
                </FormGroup>
                <FormGroup>
                  <ControlLabel>Title</ControlLabel>
                  <FormControl
                    type="text"
                    placeholder="Enter post's title"
                    name="title"
                    value={modalForm.title}
                    onChange={this.handleFormControlChange}
                  />
                </FormGroup>
                <FormGroup>
                  <ControlLabel>Category</ControlLabel>
                  <FormControl
                    componentClass="select"
                    name="category"
                    value={modalForm.category}
                    onChange={this.handleFormControlChange}>
                    {categories.map(item => (
                      <option value={item.name} key={item.name}>
                        {item.name}
                      </option>
                    ))}
                  </FormControl>
                </FormGroup>
                <FormGroup>
                  <ControlLabel>Body</ControlLabel>
                  <FormControl
                    componentClass="textarea"
                    placeholder="Enter post's body"
                    name="body"
                    value={modalForm.body}
                    onChange={this.handleFormControlChange}
                  />
                </FormGroup>
              </Modal.Body>
              <Modal.Footer>
                <Button onClick={() => this.toggleModal(false)}>Close</Button>
                <Button bsStyle="primary" type="submit">
                  Add post
                </Button>
              </Modal.Footer>
            </form>
          </Modal>
        </Grid>
      </Jumbotron>
    );
  }
}

function mapStateToProps({ posts, categories }) {
  return { posts, categories };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({ getPosts, sortPostsBy, postPost }, dispatch),
  };
}

Posts.propTypes = {
  posts: PropTypes.PropTypes.shape({
    items: PropTypes.arrayOf(PropTypes.object).isRequired,
    sortBy: PropTypes.oneOf(sortOptions.getAll().map(([key]) => key)),
  }).isRequired,
  actions: PropTypes.PropTypes.shape({
    getPosts: PropTypes.func.isRequired,
    sortPostsBy: PropTypes.func.isRequired,
    postPost: PropTypes.func.isRequired,
  }).isRequired,
  categories: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Posts);
