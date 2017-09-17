import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import { Navbar, Grid, Jumbotron } from 'react-bootstrap';
import Categories from '../Categories/Categories';
import Posts from '../Posts/Posts';

class App extends Component {
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

export default App;
