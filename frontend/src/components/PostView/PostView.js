import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Grid, Jumbotron, PageHeader } from 'react-bootstrap';
import { getPost } from '../../actions/posts';
import PostItem from '../PostItem/PostItem';

class PostView extends Component {
  static propTypes = {
    posts: PropTypes.arrayOf(PropTypes.object).isRequired,
    actions: PropTypes.shape({
      getPost: PropTypes.func.isRequired,
    }).isRequired,
    match: PropTypes.shape({
      params: PropTypes.object.isRequired,
    }).isRequired,
    history: PropTypes.shape({
      push: PropTypes.func.isRequired,
    }).isRequired,
  };

  componentDidMount() {
    const { actions, match } = this.props;

    actions.getPost(match.params.postId);
  }

  handlePostDelete = () => {
    this.props.history.push('/');
  };

  render() {
    const { posts, match } = this.props;
    const post = posts.find(item => item.id === match.params.postId);

    if (!post) {
      return null;
    }

    return (
      <Jumbotron>
        <Grid>
          <PageHeader>{post.title}</PageHeader>
          <PostItem post={post} isSingle onDelete={this.handlePostDelete} />
        </Grid>
      </Jumbotron>
    );
  }
}

function mapStateToProps({ posts }) {
  return { posts };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({ getPost }, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(PostView);
