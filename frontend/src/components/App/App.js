import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { Route, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getCategories } from '../../actions/categories';
import Navigation from '../Navigation/Navigation';
import MainView from '../MainView/MainView';
import CategoryView from '../CategoryView/CategoryView';
import PostView from '../PostView/PostView';

class App extends Component {
  static propTypes = {
    actions: PropTypes.shape({
      getCategories: PropTypes.func.isRequired,
    }).isRequired,
  };

  componentDidMount() {
    this.props.actions.getCategories();
  }

  render() {
    return (
      <div>
        <Navigation />
        <Route exact path="/" component={MainView} />
        <Route exact path="/:category" component={CategoryView} />
        <Route exact path="/:category/:postId" component={PostView} />
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({ getCategories }, dispatch),
  };
}

export default withRouter(connect(null, mapDispatchToProps)(App));
