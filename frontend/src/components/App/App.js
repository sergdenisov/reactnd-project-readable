import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { Route } from 'react-router-dom';
import { Navbar, Grid, Jumbotron } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getCategories } from '../../actions/categories';
import { getPosts } from '../../actions/posts';
import Categories from '../Categories/Categories';
import Posts from '../Posts/Posts';

class App extends Component {
  componentDidMount() {
    this.props.actions.getCategories();
    this.props.actions.getPosts();
  }

  render() {
    return (
      <div>
        <Navbar inverse>
          <Navbar.Header>
            <Navbar.Brand>
              <a href="/">Redux Nanodegree&apos;s Project: Readable</a>
            </Navbar.Brand>
          </Navbar.Header>
        </Navbar>
        <Route
          exact
          path="/"
          render={() => (
            <div>
              <Jumbotron>
                <Grid>
                  <h1>Main page</h1>
                </Grid>
              </Jumbotron>
              <Categories />
              <Posts />
            </div>
          )}
        />
        <Route
          path="/categories/:category"
          render={props => <Posts category={props.match.params.category} />}
        />
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({ getCategories, getPosts }, dispatch),
  };
}

App.propTypes = {
  actions: PropTypes.shape({
    getCategories: PropTypes.func.isRequired,
    getPosts: PropTypes.func.isRequired,
  }).isRequired,
};

export default connect(null, mapDispatchToProps)(App);
