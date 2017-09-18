import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
  Grid,
  Jumbotron,
  ListGroup,
  ButtonToolbar,
  DropdownButton,
  MenuItem,
  Button,
} from 'react-bootstrap';
import { getPosts } from '../../actions/posts';
import * as sortOptions from '../../utils/sortOptions';
import './Posts.css';
import PostModal from '../PostModal/PostModal';
import PostItem from '../PostItem/PostItem';

class Posts extends Component {
  static propTypes = {
    actions: PropTypes.shape({
      getPosts: PropTypes.func.isRequired,
    }).isRequired,
    category: PropTypes.string,
    posts: PropTypes.arrayOf(PropTypes.object).isRequired,
    parentId: PropTypes.string,
  };

  static defaultProps = {
    category: '',
    parentId: null,
  };

  state = {
    sortBy: sortOptions.getDefault(),
    isModalOpen: false,
  };

  componentDidMount() {
    const { category, actions } = this.props;

    actions.getPosts(category);
  }

  openModal = () => {
    this.setState({ isModalOpen: true });
  };

  closeModal = () => {
    this.setState({ isModalOpen: false });
  };

  render() {
    const { posts, category, parentId } = this.props;
    const { sortBy, isModalOpen } = this.state;
    const items = parentId
      ? posts.find(item => item.id === parentId).comments
      : posts;
    const filteredItems = items.filter(
      item => !category || item.category === category,
    );
    const sortedItems = filteredItems.sort(
      sortOptions.getCompareFunction(sortBy),
    );

    return (
      <Jumbotron>
        <Grid>
          {category && <h1>Posts by category: {category}</h1>}
          <div className="posts">
            <h2>{parentId ? 'Comments' : 'Posts'}</h2>
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
                id={`${parentId ? 'comments' : 'posts'}-sort`}>
                {sortOptions.getAll().map(([key, value]) => (
                  <MenuItem eventKey={key} active={key === sortBy} key={key}>
                    {value}
                  </MenuItem>
                ))}
              </DropdownButton>
              <Button bsStyle="primary" onClick={this.openModal}>
                Add {parentId ? 'comment' : 'post'}
              </Button>
            </ButtonToolbar>
          </div>
          <ListGroup>
            {sortedItems.map(item => (
              <PostItem post={item} isComment key={item.id} />
            ))}
          </ListGroup>
        </Grid>
        <PostModal
          isOpen={isModalOpen}
          onClose={this.closeModal}
          fixedCategory={category}
          post={{ parentId }}
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
    actions: bindActionCreators({ getPosts }, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Posts);
