import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { Route, withRouter } from 'react-router-dom';
import { Navbar, Grid, Jumbotron } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getCategories } from '../../actions/categories';
import Categories from '../Categories/Categories';
import Posts from '../Posts/Posts';

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
        <Navbar inverse>
          <Navbar.Header>
            <Navbar.Brand>
              <LinkContainer to="/">
                <a>Redux Nanodegree&apos;s Project: Readable</a>
              </LinkContainer>
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
          path="/:category"
          render={props => <Posts category={props.match.params.category} />}
        />
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
